<?php

namespace App\Http\Controllers\Padron;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

use App\Models\Padron\Provincias;
use App\Models\Padron\Padronelectoral;
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
                $zona = Zonas::firstOrCreate(['zona' => $persona['nom_zona']], [
                    'cod_zona' => $persona['cod_zona'], // Si también necesitas guardar el código de zona
                ]);

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
}
