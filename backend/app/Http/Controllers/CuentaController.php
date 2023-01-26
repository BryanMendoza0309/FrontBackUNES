<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Cuenta;
use App\Models\Perfil;
use App\Models\Role;
class CuentaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        

        $datos = Cuenta::whereHas('rol', function($q){
            $q->where('id', 2);
        })->with('rol')->get();
      
        $num_rows = count($datos);
        if($num_rows!=0){
           return response()->json($datos);
       }else
           return response()->json(['mensaje'=>"No existen datos registrados", 'code'=>'202']);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }

    public function validar ($correo){

        $datos=Cuenta::where('correo', $correo)->with('rol')->get();

        $num_rows = count($datos);
        if($num_rows != 0){

            if($datos[0]['rol']['estado'] == 1 && $datos[0]['estado'] == 1){
                return response()->json(['result'=>$datos, 'code'=>'201']);
            }else{
                return response()->json(['mensaje'=>"Usuario desabilitado", 'code'=>'203']);
            }

        }else{
            return response()->json(['mensaje'=>"Usuario no encontrado", 'code'=>'202']);
        }
    }
}
