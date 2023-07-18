<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('backend_apis', function (Blueprint $table) {
            $table->id();
            $table->integer('method_id')->nullable();
            $table->string('methods')->nullable();
            $table->string('controller')->nullable();
            $table->string('uri')->nullable();
            $table->string('path')->nullable();
            $table->string('permission')->nullable();
            $table->string('action')->nullable();
            $table->boolean('middleware')->nullable()->default(true);
            $table->bigInteger('created_by')->nullable();
            $table->bigInteger('updated_by')->nullable();
            $table->bigInteger('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('backend_apis');
    }
};
