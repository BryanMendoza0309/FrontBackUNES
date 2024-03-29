<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Imagen;
use App\Models\Comision;
use App\Models\Biografia;
use App\Models\localizacion;
use App\Models\Blog;
use App\Models\Video;
use App\Models\User;
use App\Models\Temaavotacion;
class Perfil extends Model
{
    protected $fillable = [
        'active','curul','firstName','email','jurisdiction','lastName','politicalParty','territorialDivision','usedFirstName',
        'usedLastName','localizacion_id'
      ];
    
    public $timestamps = false;
    public function Cuentas(){
        return $this->hasMany('App\Models\Cuenta');
     }

     public function user(){
    	return $this->hasMany(User::class);
    }

    public function comisiones(){
      return $this->belongsToMany(Comision::class)->withPivot('roleName')->withTimesTamps();;
    }

    public function Temaavotaciones(){
      return $this->belongsToMany(Temaavotacion::class)->withPivot('voto')->withTimesTamps();;
    }

    public function blogs(){
      return $this->HasMany(Blog::class)->withTimesTamps();
    }

     public function biografia(){
      return $this->belongsTo(Biografia::class);
    }

   public function localizacion(){
    return $this->belongsTo(localizacion::class);
   }

     public function image(){
    	return $this->morphMany('App\Models\Imagen','imageable');
    }

    public function videos(){
      return $this->HasMany(Video::class);
    }
}
