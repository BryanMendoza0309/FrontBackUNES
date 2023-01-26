<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Cuenta;
class Role extends Model
{
  //  use HasFactory;
    
    protected $fillable = [
        'rol','estado'
      ];

    public function Cuentas(){
        return $this->hasMany(Cuenta::class);
     }
}
