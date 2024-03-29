<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;
use App\Models\OauthAccessToken;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
class MobileAuthMiddleware extends Middleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return string|null
     */
    
    
 
     public function handle($request, Closure $next, ...$guards)
     {
        $response = auth('mobile_users')->check();
        $responseCode = 200;
        if(!$response) {
            try {
               if (!app(\Tymon\JWTAuth\JWTAuth::class)->parseToken()->authenticate()) {
               $response = 0;
               }
            } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
               $response = -1;
            } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
               $response = -2;
            } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
               $response = -3;
            }
        } else {
            $response = (int) $response;
        }
        return response()->json($response, $responseCode);
        $token = str_replace('Bearer ', '', $request->header('Authorization'));
$hashedToken = Hash::make($token);

if (hash_equals($hashedToken, $storedTokenHash)) {
    return $next($request);
} else {
    return response()->json(['prueb' =>'TOKEN INVALIDO']);
}
        $user=  Auth::guard('mobile')->attempt(['token' => $token]);
        auth()->guard('mobile')->attempt( '43b05256735319b5481bf0194c971829ce34b4002edc5ddba09b656a564acfca');
        return response()->json(['message' =>   auth()->guard('mobile')->user()]);
        return $next($request);
        // Obtener el token de autenticación de la solicitud
        $token = str_replace('Bearer ', '', $request->header('Authorization'));
        return response()->json(['prueb' =>$token]);
        // Verificar si el token de autenticación es válido
        $accessToken = \App\Models\OauthAccessToken::where('id', $token)->first();
        if (!$accessToken || $accessToken->revoked || $accessToken->expires_at < now()) {
            return response()->json(['message' => 'Unauthorized'], 401);
        }

       // dd($request);
        return response()->json(['prueb' =>$request]);
        if($toke = $request->cookie('cookie_token')){
            $request->headers->set('Authorization', 'Bearer '.$toke);
        }
        $this->authenticate($request, $guards);
        return $next($request);


        return response()->json(['error' =>auth()->guard('mobile')->user()], 401);
        if (!Auth::guard('mobile')->check()) {
            // Si no está autenticado, devolvemos un error
            return response()->json(['error' => 'Unauthorized'], 401);
        }

        // Si está autenticado, continuamos con la petición
        return $next($request);
     }
    
}
