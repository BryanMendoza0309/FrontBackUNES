<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Hash;
use App\Models\Perfil;
use App\Models\Imagen;
use App\Models\User;
use App\Models\Biografia;
use App\Models\Comision;
use App\Models\localizacion;
use App\Models\Divisionterritorial;
use App\Models\Categorie;
use App\Models\Permisos;
use App\Models\Roles;
use Illuminate\Support\Facades\Gate;
class PerfilesController extends Controller
{


    public function index()
    {
        set_time_limit(300000);
        $validacion= Perfil::get();
        if(!$validacion->isEmpty()){
            return response()->json("Perfiles Cargados en la base de datos.");;
        }
        $tokenapi = Http::asForm()->post('http://apiapp.asambleanacional.gob.ec/auth/login', [
            'username' => '68566D597133743677397A244326462948404D635166546A576E5A7234753778214125442A472D4B6150645267556B58703273357638792F423F4528482B4D62',
            'password' => '397A24432646294A404E635266556A586E5A7234753778214125442A472D4B6150645367566B59703373357638792F423F4528482B4D6251655468576D5A7134',
        ]);
        $token = $tokenapi->json();
        Categorie::insert([
            ['categorianame' => 'Agenda'],
            ['categorianame' => 'Opinion'],
            ['categorianame' => 'Entrevistas'],
            ['categorianame' => 'Fizcalisamos'],
            ['categorianame' => 'Legislamos'],
        ]);
    
        Permisos::insert([
            [
                'nombre' => 'Seccion inicio',
                'slug' => 'inicio',
                'descripcion' => 'Accede a la vista de inicio',
            ],
            [
                'nombre' => 'Appmobile',
                'slug' => 'appmobile',
                'descripcion' => 'Acceso a la app mobile',
            ],
            [
                'nombre' => 'Registrador de Usuarios',
                'slug' => 'RegiterUser',
                'descripcion' => 'Accede a la seccion de registro de usuarios en sus diferentes niveles',
            ],
            [
                'nombre' => 'Actualizador de Usuarios',
                'slug' => 'UpdateUser',
                'descripcion' => 'Puede actualizar usuarios en los diferentes niveles (le aparece el boton de editar)',
            ],
            [
                'nombre' => 'Ve los usuarios registrado',
                'slug' => 'ViewUser',
                'descripcion' => 'Puede ver todos los usuarios registrados y su informacion',
            ],
            [
                'nombre' => 'Aprobardor o denegardor blogs en ultimas noticias',
                'slug' => 'AprobarBlogs',
                'descripcion' => 'tiene permisos para acceder a las vistas para aprobar o denegar blogs para que aparezcan en la seccion de ultimas noticias de la aplicacion',
            ],
            [
                'nombre' => 'Ve lista de blogs en ultimas noticias',
                'slug' => 'listarblogsporaprobar',
                'descripcion' => 'tiene permisos para acceder a las vistas para ver blogs que estan a la espera de ser aprobados a para que aparezcan en ultimas noticias',
            ],
            [
                'nombre' => 'Ve lista de blogs aprobados en noticias',
                'slug' => 'listarblogsaprobados',
                'descripcion' => 'tiene permisos para acceder a las vistas para ver blogs que estan aprobados para que aparezcan en ultimas noticias',
            ],
            [
                'nombre' => 'Creador de blogs',
                'slug' => 'creadorDeBlogs',
                'descripcion' => 'tiene permisos para acceder a las vistas para crear blogs',
            ],
            [
                'nombre' => 'Ver blogs creados',
                'slug' => 'VerBlogs',
                'descripcion' => 'tiene permisos para acceder a las vistas ver los blogs',
            ],
            [
                'nombre' => 'Editor de blogs',
                'slug' => 'EditaBlogs',
                'descripcion' => 'tiene permisos para acceder a las vistas de editar blos',
            ],
            [
                'nombre' => 'Notificacion de aprobar blog ultima noticia Admin',
                'slug' => 'NotifyBlogAprobar',
                'descripcion' => 'Pemite escuchar todas las notificaciones cuando se crea un blog a aprobarse para ultimas noticias',
            ],
            [
                'nombre' => 'Notificacion de blog denegado o aprobado para los usuarios o el usuario del perfil al que se le creo un nuevo blog ',
                'slug' => 'Notifyblog',
                'descripcion' => 'Pemite escuchar las notificaciones relacionadas a la aprobacion o denegacion del blog creado para ultima noticia',
            ],
        ]);
    
        $superAdmin = [
            'nombre' => 'Super Administrador',
            'slug' => 'super_administrador',
            'descripcion' => 'Tiene acceso a todo',
            'fullacceso' => 'yes',
        ];
        
        $asambleista = [
            'nombre' => 'Asambleista',
            'slug' => 'asambleista',
            'descripcion' => 'Tiene acceso a las opciones de los Asambleistas',
            'fullacceso' => 'no',
        ];
        
        $asistente = [
            'nombre' => 'Asistente',
            'slug' => 'asistente',
            'descripcion' => 'Tiene acceso a las opciones de los Asistentes',
            'fullacceso' => 'no',
        ];

        $presidente = [
            'nombre' => 'Presidente',
            'slug' => 'presidente',
            'descripcion' => 'Tiene acceso a las opciones de los presidente',
            'fullacceso' => 'no',
        ];
        $vicepresidente = [
            'nombre' => 'Vicepresidente',
            'slug' => 'vicepresidente',
            'descripcion' => 'Tiene acceso a las opciones de los vicepresidente',
            'fullacceso' => 'no',
        ];
        
        $superAdmin = Roles::create($superAdmin);
        $superAdmin->permisos()->sync([1,3,4,5,6,7,8,9,10,11,12]);
        
        $asambleista = Roles::create($asambleista);
        $asambleista->permisos()->sync([1,9,10,11,13]);
        
        $asistente = Roles::create($asistente);
        $asistente->permisos()->sync([1,9,10,11]);

        $presidente = Roles::create($presidente);
        $presidente->permisos()->sync([1,9,10,11]);

        $vicepresidente = Roles::create($vicepresidente);
        $vicepresidente->permisos()->sync([1,9,10,11]);
        
     //   $roles = [$superAdmin, $asambleista, $asistente];
        
       // Roles::insert($roles);
           

        $Ambitoterritorial = Http::withHeaders([
            'Content-Type' => 'application/jason',
            'Authorization' => $token['token'],
            ])->get('http://apiapp.asambleanacional.gob.ec/periodsResource/territorialDivision/');


        foreach (collect($Ambitoterritorial->json()) as $Ambitoterritorialaux){
            $territorial = new Divisionterritorial();
            $territorial->id= $Ambitoterritorialaux['id'];
            $territorial->name= $Ambitoterritorialaux['name'];
            $territorial->save();
        }

        $Comisiones = Http::withHeaders([
            'Content-Type' => 'application/jason',
            'Authorization' => $token['token'],
            ])->get('http://apiapp.asambleanacional.gob.ec/periodsResource/7/meetingGroups/2');

        foreach (collect($Comisiones->json()) as $Comisionesaux){
            $Comision = new Comision();

            $Comision->id= $Comisionesaux['id'];
            $Comision->name= $Comisionesaux['name'];
            $Comision->save();
        }

        $Perfiles2 = new Perfil();
        $Perfiles2->id=1;
        $Perfiles2->active=1;
        $Perfiles2->curul=0;
        $Perfiles2->firstName='RC5';
        $Perfiles2->email='superadmin@hotmail.com';
        $Perfiles2->jurisdiction='ECUADOR';
        $Perfiles2->lastName='BANCADA CIUDADANA RC5';
        $Perfiles2->politicalParty='RC5';
        $Perfiles2->territorialDivision='ECUADOR';
        $Perfiles2->usedFirstName='BANCADA CIUDADANA RC5';
        $Perfiles2->usedLastName='BANCADA CIUDADANA RC5';

        $rolid = Roles::where('slug','super_administrador')->firstOrFail();
        $urlimagenes=[];
    $urlimagenes[]['imagen']="12j3h1j2n31kn23k1nk";
        $Perfiles2->save();
        $Perfiles2->image()->createMany($urlimagenes);


        User::create([
            'name' => 'Super Admin',
            'email' => 'superadmin@hotmail.com',
            'estado'=> 1,
            'password' =>Hash::make('12345678'),
            'perfil_id'=>1
        ])->roles()->sync([$rolid->id]); 

        

        $request = Http::withHeaders([
        'Content-Type' => 'application/jason',
        'Authorization' => $token['token'],
        ])->get('http://apiapp.asambleanacional.gob.ec/assemblyMembersResource/findnew/7/0/0/false/false/false/0/0/0/0');


        $asambleistas= collect($request->json());
        $filtered = $asambleistas->whereIn('politicalParty', ["MOVIMIENTO POLÍTICO REVOLUCIÓN CIUDADANA","SEGUIMOS HACIENDO HISTORIA RC5-MAR70-PLAN77"])->whereIn("active",[true]);

        


        foreach ($filtered as $asambleista) {
            $aux=((string)$asambleista["id"]);
           
            $request2 = Http::withHeaders([
                'Content-Type' => 'application/jason',
                'Authorization' => $token['token'],
                //'Content-Disposition'=> 'attachement',
                ])->get('http://apiapp.asambleanacional.gob.ec/assemblyMembersResource/getPhoto/'.$aux);

                $urlimagenes2=[];
                $urlimagenes2['imagen']=['imagen' => $request2 ];

                
            $Perfiles = new Perfil();

            $Perfiles->id=$asambleista["id"];
            $Perfiles->active=$asambleista["active"];
            $Perfiles->curul=$asambleista["curul"];
            $Perfiles->firstName=$asambleista["firstName"];
            $Perfiles->email=$asambleista["email"];
            $Perfiles->jurisdiction=$asambleista["jurisdiction"];
            $Perfiles->lastName=$asambleista["lastName"];
            $Perfiles->politicalParty=$asambleista["politicalParty"];
            $Perfiles->territorialDivision=$asambleista["territorialDivision"];
            $Perfiles->usedFirstName=$asambleista["usedFirstName"];
            $Perfiles->usedLastName=$asambleista["usedLastName"];
            
            $Perfiles->image()->createMany($urlimagenes2);
            
            
            $Perfiles->save();

            if(!empty($asambleista["locationDto"])){
                $localizacionserver= [];
                if(!empty($asambleista["locationDto"]["city"])){
                    $localizacionserver['city']=$asambleista["locationDto"]["city"];
                }else{
                    $localizacionserver['city']=null;
                }
                if(!empty($asambleista["locationDto"]["edifice"])){
                    $localizacionserver['edifice']=$asambleista["locationDto"]["edifice"];
                }else{
                    $localizacionserver['edifice']=null;
                }
                if(!empty($asambleista["locationDto"]["floor"])){
                    $localizacionserver['floor']=$asambleista["locationDto"]["floor"];
                }else{
                    $localizacionserver['floor']=null;
                }
                if(!empty($asambleista["locationDto"]["office"])){
                    $localizacionserver['office']=$asambleista["locationDto"]["office"];
                }else{
                    $localizacionserver['office']=null;
                }
                if(!empty($asambleista["locationDto"]["phone"])){
                    $localizacionserver['phone']=$asambleista["locationDto"]["phone"];
                }else{
                    $localizacionserver['phone']=null;
                }
                $localizacion= localizacion::create($localizacionserver);
                
                $Perfiles->localizacion_id=$localizacion->id;
                $Perfiles->update();
            }
            
            
        }

        
        $ListaComi= Comision::all();
        $ListadePerfiles= Perfil::all();
        foreach ($ListaComi as $Comi) {
            $AsamXComision = Http::withHeaders([
                'Content-Type' => 'application/jason',
                'Authorization' => $token['token'],
                ])->get('http://apiapp.asambleanacional.gob.ec/meetingGroupsResource/'.$Comi->id.'/assemblyMembersNoPicNew/');
            $listaAsambleXComision = collect($AsamXComision->json());
        foreach ($listaAsambleXComision as $AsambleXComision) {
            $auxPerfil= $ListadePerfiles->firstWhere('id',$AsambleXComision['id']);
            if( $auxPerfil!=null){
                $auxPerfil->comisiones()->save($Comi,['roleName' => $AsambleXComision['roleName']]);

            }
            
         }
       
        }
        
        return response()->json("Perfiles Cargados en la base de datos.");
    }

    public function ListarPerfiles (){
        $validacion= Perfil::where('active',1)->with('image')->with('localizacion')->get();
       
        return response()->json($validacion);
    }

    public function ListarPerfileSiAsambleista (){
        $validacion= Perfil::where('active',1)->select(['id','firstName', 'lastName'])->doesntHave('user')->get();
       
        return response()->json($validacion);
    }

    public function ObtenerImagen (Request $request){
     
        $datos=Perfil::where('id', $request->id)->with('image')->get();

      // dd($datos[0]->image['imagen']);
        return  response()->json($datos[0]->image);
    }

    public function ObtenerAsambleistaTerritorio (Request $request){
       
        $datos=Perfil::where('territorialDivision', $request->territorialDivision)->with('image')->get();

        return  response()->json($datos);
    }

    public function ObtenerTerritorio (){
     
        $datos=Divisionterritorial::get();

       
        return  response()->json($datos);
    }


    public function RegistrarBiografia (Request $request){
        $Perfiles= Perfil::findOrFail($request->id);
        $data=[];

       
    
        if($request->urlfb!=null){
            $data['urlfb']= $request->urlfb;
        }
    
        if($request->urltw!=null){
            $data['urltw']= $request->urltw;
        }
    
        if($request->urlit!=null){
            $data['urlit']= $request->urlit;
        }
    
        if($request->urlttk!=null){
            $data['urlttk']= $request->urlttk;
        }
    
        if($request->perfil!=null){
            $data['perfil']= $request->perfil;
        }
    
        if($Perfiles->biografia_id==null){
            $biografia= Biografia::create($data);
            $Perfiles->biografia_id=$biografia->id;
            if($request->imagen!=null){
                $urlimagenes2=[];
                $urlimagenes2['imagen']=['imagen' => base64_decode($request->imagen) ];
                $biografia->image()->createMany($urlimagenes2);
            }
            $Perfiles->update();

        }else{
          
            if($data!=null){
                $Perfiles->biografia()->update($data);
             }
            
            if($request->imagen!=null){
                $urlimagenes2=[];
                $urlimagenes2['imagen']=['imagen' =>  base64_decode($request->imagen)];
             
                $Perfiles->load(['biografia'  => function ($query) use ($urlimagenes2) {
                    $query->with(['image'=> function ($query) use ($urlimagenes2) {
                        $query->update( $urlimagenes2['imagen']);
                    }]);
                }]);
            }
        }

        return  response()->json("200");
        
    }

    public function ObtenerBiografia (Request $request){
        $Perfilesfinal= Perfil::where('id',$request->id)->with(['biografia'=> function ($query){
            $query->with('image');
        }])->get();

        
        if($Perfilesfinal[0]->biografia_id==null){
            return  response()->json(['error'=>'404']);
        }
        return  response()->json($Perfilesfinal[0]->biografia);
           
     }

     public function ObtenerPerfil (Request $request){
        $Perfilesfinal= Perfil::where('id',$request->id)->with('image')->with('localizacion')->with('comisiones')->get();

        
        if($Perfilesfinal->isEmpty()){
            return  response()->json(['error'=>'404']);
        }
        return  response()->json($Perfilesfinal[0]);
           
     }


     public function CrearPerfil (Request $request){
        $Perfiles = new Perfil();
        
        $Perfiles->active=true;
        $Perfiles->curul='0';
        $Perfiles->firstName=$request->firstName;
        $Perfiles->email=$request->email;
        $Perfiles->jurisdiction=$request->jurisdiction;
        $Perfiles->lastName=$request->lastName;
        $Perfiles->politicalParty='Revolucion Ciudadana';
        $Perfiles->territorialDivision=$request->territorialDivision;
        $Perfiles->usedFirstName=$request->usedFirstName;
        $Perfiles->usedLastName=$request->usedLastName;
        
        if($request->imagen==null || $request->imagen==''){
            $urlimagenes2['imagen']=['imagen' => base64_decode('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') ];
            }else{
                $urlimagenes2['imagen']=['imagen' => base64_decode($request->imagen) ];
            }
        
        
        $Perfiles->save();

        

        return  response()->json(['error'=>'200','perfil'=>$Perfiles]);


           
     }
     
}

