<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use App\Models\OauthAccessToken;
use Cookie;
use App\Models\Roles;
use App\Events\NotifyEventBlog;
use App\Notifications\NotifyBlogsPorAprobar;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Gate;
class AuthController extends Controller
{

    public function Register(Request $request){
        if(Gate::check('haveacceso','RegiterUser')==false){
            return response()->json('403');
        };
        $request->validate([
            'name'=>'required',
            'email'=>'required||unique:users,email',
            'password'=>'required'    
        ]);

        $user= new User();
        
        $rolid = Roles::where('id',$request->rol_id)->firstOrFail();
        
        User::create([
            'name' =>$request->name ,
            'email' =>$request->email,
            'estado'=> $request->estado,
            'password' =>Hash::make($request->password),
            'perfil_id'=>$request->perfil_id
        ])->roles()->sync([ $rolid->id]); 


        return response()->json(['menssage'=>'registro correcto']);
    }

    static function Notifique(){
        $now = Carbon::now();
        $notify= Auth::user()->notifications->map(function($notify) use ($now){
            $created_at = Carbon::parse($notify->created_at);
            return [
                'blogtitulo'=> $notify->data['blogtitulo'],
                'blogdescripcion'=> $notify->data['blogdescripcion'],
                'blogcontenido'=> $notify->data['blogcontenido'],
                'categorie'=> $notify->data['categorie_id'],
                'perfil'=> $notify->data['perfil'],
                'user'=> $notify->data['user'],
                'time'=> $notify->created_at,
                'idblog'=> $notify->data['id'],
                'leido'=> $notify->read_at,
                'id_notify'=> $notify->id,
                'date'=> $notify->data['date']
            ];

        });
        event(new NotifyEventBlog($notify, Auth::user()->roles[0]->slug, Auth::user()->id));
    }

    public function Login(Request $request){

        $credentials= $request->validate([
            'email'=>['required','email'],
            'password'=>['required']    
        ]);

        if(Auth::attempt($credentials)){
            $user=Auth::user();
            $userAuth= Auth::user()->where('email',$request->email)->with('roles')->get();
            $token= $user->createToken('token')->plainTextToken;

            $tokenexpire= OauthAccessToken::where('tokenable_id',$userAuth[0]->id)->get()->last();
            $tokenexpire->expires_at=Carbon :: now ( )->addHour(2);
            $tokenexpire->update();

            $cookie = cookie('cookie_token',$token,60*1);
            return response(['token'=>$token, 'usuario'=>$userAuth,'menssage'=>'Login correcto','code'=>'200'])->withoutCookie($cookie);
        }else{
            return response()->json(['error' => 'Unauthorized','code'=>'401']);
        }
        return response()->json(['menssage'=>'Login correcto','code'=>'200']);
    }

    public function Logout(Request $request){
        
        $cookie = Cookie::forget('cookie_token');
        $userAuth= User::where('email',$request->email)->get();    
        $token= OauthAccessToken::where('tokenable_id',$userAuth[0]->id)->get()->last();    
         $token->expires_at= Carbon :: now ( ) -> toDateTimeString ( );
         $token->update();
        return response(['menssage'=>'logout correcto'])->withCookie($cookie);
    }

    public function Update(Request $request){
        if(Gate::check('haveacceso','UpdateUser')==false){
            return response()->json('403');
        };
        $validator = Validator::make($request->all(), [
            'email'=>'required|email|unique:users',
        ]);

        $user = User::findOrFail($request->id);
        if (!$validator->fails()) {
            $user->email=$request->email;
        }
        
        $user->name=$request->name;
        $user->estado=$request->estado;
        if(!$request->password==null){
            $user->password=Hash::make($request->password);
        }
        $user->perfil_id=$request->perfil_id;
        $user->update();


        return response()->json(['menssage'=>'usuarios actualizado correctamente']);
    }

    public function Delete(Request $request){ 
        
    }
}
