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
        Schema::create('main_menu_project_managements_type', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->bigInteger('created_by')->nullable();
            $table->bigInteger('updated_by')->nullable();
            $table->bigInteger('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('main_menu_project_managements_status', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->bigInteger('created_by')->nullable();
            $table->bigInteger('updated_by')->nullable();
            $table->bigInteger('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('main_menu_project_managements_priority', function (Blueprint $table) {
            $table->id();
            $table->string('name')->unique();
            $table->bigInteger('created_by')->nullable();
            $table->bigInteger('updated_by')->nullable();
            $table->bigInteger('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('main_menu_project_managements', function (Blueprint $table) {
            $table->id();
            $table->string('code')->unique();
            $table->string('title');
            $table->string('main_menu_project_managements_type_id');
            $table->string('main_menu_project_managements_priority_id');
            $table->text('description');
            $table->bigInteger('repaired')->nullable();
            $table->bigInteger('created_by')->nullable();
            $table->bigInteger('updated_by')->nullable();
            $table->bigInteger('deleted_by')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('main_menu_project_managements_history', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('main_menu_project_management_id');
            $table->unsignedBigInteger('main_menu_project_managements_status_id');
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
        Schema::dropIfExists('main_menu_project_managements_type');
        Schema::dropIfExists('main_menu_project_managements_status');
        Schema::dropIfExists('main_menu_project_managements_priority');
        Schema::dropIfExists('main_menu_project_managements');
        Schema::dropIfExists('main_menu_project_managements_history');
    }
};
