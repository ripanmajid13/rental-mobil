<?php

use App\Http\Controllers\Auth\FlushCacheController;
use App\Http\Controllers\Auth\ForgotPasswordController;
use App\Http\Controllers\Auth\LockAccountController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\LogoutController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Backend\ApiController;
use App\Http\Controllers\Backend\LogController;
use App\Http\Controllers\MainMenu\ManajemenMobilController;
use App\Http\Controllers\MainMenu\PeminjamanMobilController;
use App\Http\Controllers\MainMenu\PengembalianMobilController;
use App\Models\Backend\Api;
use App\Models\PeminjamanMobil;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/forgot-password', ForgotPasswordController::class);
Route::post('/login', LoginController::class);
Route::post('/register', RegisterController::class);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/flush-cache', FlushCacheController::class);
    Route::post('/lock-account', LockAccountController::class);
    Route::post('/logout', LogoutController::class);

    // --------------- backend ---------------

    Route::controller(ApiController::class)
    ->middleware(['permission:backend-api'])
    ->name('backend-api.')
    ->prefix('backend-api')
    ->group(function () {
        Route::post('', 'index');
        Route::put('/update', 'update');
    });

    Route::controller(LogController::class)
    ->middleware(['permission:backend-log'])
    ->name('backend-log.')
    ->prefix('backend-log')
    ->group(function () {
        Route::post('', 'index');
    });

    Route::controller(ManajemenMobilController::class)
    ->name('main-menu-manajemen-mobil.')
    ->prefix('main-menu-manajemen-mobil')
    ->group(function () {
        Route::post('', 'index');
        Route::post('store', 'store');
        Route::put('{id}/update', 'update');
        Route::delete('{id}/destroy', 'destroy');
    });

    Route::controller(PeminjamanMobilController::class)
    ->name('main-menu-peminjaman-mobil.')
    ->prefix('main-menu-peminjaman-mobil')
    ->group(function () {
        Route::post('', 'index');
        Route::post('create', 'create');
        Route::post('store', 'store');
        Route::post('{id}/edit', 'edit');
        Route::put('{id}/update', 'update');
        Route::delete('{id}/destroy', 'destroy');
    });

    Route::controller(PengembalianMobilController::class)
    ->name('main-menu-pengembalian-mobil.')
    ->prefix('main-menu-pengembalian-mobil')
    ->group(function () {
        Route::post('', 'index');
        Route::post('create', 'create');
        Route::post('store', 'store');
    });



    // --------------- database ---------------

    // if (Schema::hasTable('backend_apis')) {
    //     $routes = Api::orderBy('method_id', 'asc')->orderBy('uri', 'ASC')->get();
    //     foreach ($routes as $route) {
    //         if (file_exists(app_path(Str::replace('\\', '/', Str::replace('\\App\\', '', $route->controller)).'.php'))) {
    //             if ($route->middleware == true) {
    //                 if ($route->action == '__invoke') {
    //                     Route::match(json_decode($route->methods), $route->uri, $route->controller)->middleware(['permission:'.$route->permission]);
    //                 } else {
    //                     Route::match(json_decode($route->methods), $route->uri, [$route->controller, $route->action])->middleware(['permission:'.$route->permission]);
    //                 }
    //             } else {
    //                 if ($route->action == '__invoke') {
    //                     Route::match(json_decode($route->methods), $route->uri, $route->controller);
    //                 } else {
    //                     Route::match(json_decode($route->methods), $route->uri, [$route->controller, $route->action]);
    //                 }
    //             }
    //         }
    //     }
    // }
});
