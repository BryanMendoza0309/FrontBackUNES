<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('roles', function (Blueprint $table) {
            $table->bigIncrements('id_rol');
            $table->string('rol');
            $table->boolean('estado');
        });

        DB::table("roles")
        ->insert([
            "rol" => "Administrador",
            "estado" => 1
        ]);

        DB::table("roles")
        ->insert([
            "rol" => "Asambleista",
            "estado" => 1,
        ]);

        DB::table("roles")
        ->insert([
            "rol" => "Delegado",
            "estado" => 1,
        ]);
    }



    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('roles');
    }
};
