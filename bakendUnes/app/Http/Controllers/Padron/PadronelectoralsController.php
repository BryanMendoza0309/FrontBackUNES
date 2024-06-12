<?php

namespace App\Http\Controllers\Padron;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Padron\Provincias;
use App\Models\Padron\Padronelectoral;
use App\Models\Padron\Adherentes;
use Illuminate\Support\Facades\Http;
use App\Models\Padron\Zonas; // Importa el modelo Zona
class PadronelectoralsController extends Controller
{


    public function CargarPadronElectoral(Request $request)
    {
    // Obtener todas las provincias de la base de datos
        $provincias = Provincias::all();

    // Iterar sobre cada provincia
        foreach ($provincias as $provincia) {
        // Obtener el ID de la provincia
            $provinciaId = $provincia->id;

        // Hacer una solicitud a la API para obtener las personas empadronadas en esta provincia
            $response = Http::get("https://rc5ec.com/api/padron2023?cod_provincia=eq.{$provinciaId}");

        // Verificar si la solicitud fue exitosa y el cuerpo de la respuesta es un JSON válido
            if ($response->successful() && $response->json()) {
                $personas = $response->json();

            // Iterar sobre cada persona y guardarla en la base de datos
                foreach ($personas as $persona) {
                // Buscar o crear una nueva zona


                // Crear el registro en la tabla PadronElectoral
                    PadronElectoral::create([
                    'nom_padron' => $persona['nom_padron'],
                    'cedula' => $persona['cedula'],
                        'nom_recinto' => $persona['nom_recinto'],
                        'junta' => $persona['junta'],
                        'sexo' => $persona['sexo'],
                        'provincia_id' => $provinciaId,
                        'cantone_id' => $persona['cod_canton'],
                        'parroquia_id' => $persona['cod_parroquia'],
                   // 'zona_id' => $zona->cod_zona, // Utiliza el ID de la zona
                        'adherente' => $persona['adherente'] ?? null
                    ]);
                }
            }
        }

    // Si se han guardado correctamente los datos, puedes devolver una respuesta de éxito
        return response()->json(['message' => 'Datos del padrón electoral cargados exitosamente.']);
    }

    public function ActualizarAdherentesPadronElectoral()
    {

        $adherentes = Adherentes::where('tipo', 'ADHERENTE PERMANENTE')->get();
        foreach ($adherentes as $adherente) {
            $cedula = $adherente->cedula;
        
            // Verificar si la cédula ya existe en padronelectoral y el campo adherente no es nulo
            $existente = Padronelectoral::where('cedula', $cedula)
                ->whereNotNull('adherente')
                ->exists();
        
            if ($existente) {
                continue; // Saltar este registro si la cédula ya existe y el campo adherente no es nulo
            }
        
            // Realizar solicitud a la API
            $response = Http::get('https://yosoyrc5.com/api/padron2023?cedula=eq.' . $cedula);
        

            
            // Verificar si la solicitud fue exitosa y si se encontró información
            if ($response->successful() && !empty($response->json())) {
                $data = $response->json()[0];
                // Verificar si el registro ya existe en padronelectoral
                $padronExistente = Padronelectoral::where('cedula', $cedula)->exists();
                if ($padronExistente) {
                    // Actualizar el registro existente en padronelectoral con información del adherente
                    Padronelectoral::where('cedula', $cedula)->update([
                        'adherente' => $adherente->tipo
                    ]);
                } else {
                    // Crear un nuevo registro en padronelectoral
                    Padronelectoral::create([
                        'nom_padron' => $data['nom_padron'],
                        'cedula' => $data['cedula'],
                        'nom_recinto' => $data['nom_recinto'],
                        'junta' => $data['junta'],
                        'sexo' => $data['sexo'],
                        'provincia_id' => $data['cod_provincia'],
                        'cantone_id' => $data['cod_canton'],
                        'parroquia_id' => $data['cod_parroquia'],
                        'adherente' => $adherente->tipo,
                        // Agregar otras columnas según sea necesario
                    ]);
                }
            }
        }
    }

    public function Todaldedatos()
{
    // Obtener cédulas de los adherentes permanentes
    $cedulas = Adherentes::where('tipo', 'ADHERENTE')->pluck('cedula')->toArray();

    // Dividir las cédulas en lotes de 1000
    $lotes = array_chunk($cedulas, 2500);

    // Inicializar un array para almacenar los datos de la API
    $datosTotales = [];

    // Realizar una solicitud a la API para cada lote de cédulas
    foreach ($lotes as $lote) {
        // Convertir el lote de cédulas en una cadena separada por comas
        $cedulasConcatenadas = implode(',', $lote);

        // Realizar solicitud a la API con el lote de cédulas
        $response = Http::get('https://yosoyrc5.com/api/padron2023', [
            'cedula' => 'in.('. $cedulasConcatenadas .')'
        ]);

        // Verificar si la solicitud fue exitosa y agregar los datos al array total
        if ($response->successful()) {
            $datos = $response->json(); // Obtener los datos en formato JSON
            $datosTotales = array_merge($datosTotales, $datos); // Agregar los datos al array total
        } else {
            // Manejar el caso en que la solicitud no fue exitosa
            // Puedes registrar un error o manejarlo según sea necesario
        }
    }

    // Devolver los datos totales obtenidos de todas las solicitudes
    return response()->json($datosTotales);
}
    public function Leerjson()
    {   
    // Ruta al archivo JSON en la carpeta public
    $jsonFilePath = public_path('ADHERENTE PERMANETE.json');

    // Verifica si el archivo existe
    if (file_exists($jsonFilePath)) {
        // Lee el archivo JSON
        $json = file_get_contents($jsonFilePath);
        $data = json_decode($json, true);

        // Itera sobre cada objeto en el archivo JSON
        foreach ($data as $item) {
            // Crea un nuevo registro en la tabla padronelectorals
            Padronelectoral::create([
                'nom_padron' => $item['nom_padron'],
                'cedula' => $item['cedula'],
                'nom_recinto' => $item['nom_recinto'],
                'junta' => $item['junta'],
                'sexo' => $item['sexo'],
                'adherente' => 'ADHERENTE', // Define el valor de la columna adherente
                // Si tienes las relaciones definidas en los modelos, puedes asignar los IDs correspondientes aquí
                'provincia_id' => $item['cod_provincia'],
                'cantone_id' => $item['cod_canton'],
                'parroquia_id' => $item['cod_parroquia'],
                
            ]);
        }
    } else {
        // Maneja el caso en que el archivo no exista
        // Puedes registrar un error o manejarlo según sea necesario
        echo "El archivo JSON no existe en la carpeta public.";
    }
    }


    public function generarJsonSegunProvincia(Request $request)
    {

            // Validar la solicitud
            $request->validate([
                'cod_provincia' => 'required|integer',
                'nombre_archivo' => 'required|string',
            ]);
    
            // Obtener el ID de la provincia y el nombre del archivo desde la solicitud
            $cod_provincia = $request->cod_provincia;
            $nombre_archivo = $request->nombre_archivo;
    
            // Obtener la respuesta JSON de la otra API
            $response = Http::timeout(10000)->get('https://rc5ec.com/api/padron2023?cod_provincia=eq.'.$cod_provincia);
    
            if ($response->successful()) {
                // Guardar la respuesta JSON en un archivo con el nombre proporcionado
                file_put_contents(public_path('/cantones/'.$nombre_archivo . '.json'), $response->body());
    
                return response()->json(['message' => 'Datos capturados y guardados en ' . $nombre_archivo . '.json']);
            } else {
                return response()->json(['error' => 'La solicitud no fue exitosa'], 500);
            }
        
    }

    public function CargarPadron2023(Request $request)
    {
        // Obtener los cantones por provincia
        $CantonesPorProvincia = Http::get('https://yosoyrc5.com/api/cantones?idprovincia=eq.' . $request->idProvincia);
    
        if ($CantonesPorProvincia->successful()) {
            $cantones = $CantonesPorProvincia->json();
    
            // Recorrer los cantones
            foreach ($cantones as $canton) {
                $idCanton = $canton['id'];
    
                // Obtener las parroquias por cantón
                $ParroquiasPorCanton = Http::get('https://yosoyrc5.com/api/parroquias?idcanton=eq.' . $idCanton);
                $parroquias = $ParroquiasPorCanton->json();
    
                foreach ($parroquias as $parroquia) {
                    $idparroquia = $parroquia['id'];
    
                    // Obtener el padrón 2023 por parroquia
                    $response = Http::timeout(10000)->get('https://yosoyrc5.com/api/padron2023?cod_parroquia=eq.' . $idparroquia);
    
                    if ($response->successful()) {
                        $directoryPath = public_path('parroquia');

                    // Obtener el nombre de la parroquia y reemplazar "/" por un espacio si es necesario
                    $parroquiaNombre = $parroquia['parroquia'];
                    if (strpos($parroquiaNombre, '/') !== false) {
                        $parroquiaNombre = str_replace('/', ' ', $parroquiaNombre);
                    }

                    $jsonFilePath = $directoryPath . '/' . $parroquiaNombre . '.json';

                    // Verificar si el directorio existe, si no, crearlo
                    if (!file_exists($directoryPath)) {
                        mkdir($directoryPath, 0777, true);
                    }
    
                        // Guardar la respuesta JSON en un archivo con el nombre proporcionado
                        file_put_contents($jsonFilePath, $response->body());
    
                        // Verificar si el archivo se ha creado correctamente
                        if (file_exists($jsonFilePath)) {
                            // Lee el archivo JSON
                            $json = file_get_contents($jsonFilePath);
                            $data = json_decode($json, true);
    
                            // Itera sobre cada objeto en el archivo JSON
                            foreach ($data as $item) {
                                // Crea un nuevo registro en la tabla padronelectorals
                                Padronelectoral::create([
                                    'nom_padron' => $item['nom_padron'],
                                    'cedula' => $item['cedula'],
                                    'nom_recinto' => $item['nom_recinto'],
                                    'junta' => $item['junta'],
                                    'sexo' => $item['sexo'],
                                    'adherente' => null, // Define el valor de la columna adherente
                                    'provincia_id' => $item['cod_provincia'],
                                    'cantone_id' => $item['cod_canton'],
                                    'parroquia_id' => $item['cod_parroquia'],
                                ]);
                            }
                        } else {
                            // Maneja el caso en que el archivo no exista
                            return response()->json(['error' => 'El archivo JSON no existe en la carpeta public.'], 500);
                        }
                    } else {
                        return response()->json(['error' => 'La solicitud no fue exitosa'], 500);
                    }
                }
            }
        } else {
            // Manejar el error si la solicitud no fue exitosa
            $errorCode = $CantonesPorProvincia->status();
            return response()->json(['error' => "Error en la solicitud HTTP: $errorCode"], 500);
        }
    
        return response()->json(['respuesta' => 'provincia cargada correctamente']);
    }


    public function consultarAdherenteEnPadron(Request $request)
    {

        $adherente = Padronelectoral::where('cedula', $request->cedula)->first();

        // Retornar la respuesta de la consulta
        if ($adherente->adherente!=null) {
            // Retornar el nombre del adherente
            return response()->json(['nombre' => $adherente->nom_padron, 'cedula' => $adherente->cedula, 'tipo' => $adherente->adherente, 'code'=>'200' ]);
        } else {
            // Retornar un mensaje indicando que no se encontró un adherente permanente con la cédula especificada
            return response()->json(['mensaje' => 'LA CEDULA INGRESADA NO PERTENECE A UN ADHERENTE, LLENE EL SIGUIENTE FORMULARIO PARA SER PARA SER PARTE DE LA RC5', 'error'=>'400', 'data'=>$adherente]);
        }
    }



    

}
