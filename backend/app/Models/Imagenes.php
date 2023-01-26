<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Perfil;
class Imagenes extends Model
{
    //use HasFactory;
    public $timestamps = false;
    protected $fillable = ['id','imagen'];
    public function Imagen(){
        return $this->belongsTo(Perfil::class);
     }
}
