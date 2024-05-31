<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductCatalogController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(['middleware' => 'api', 'prefix' => 'auth'], function ($router) {
    Route::post('register', [AuthController::class, 'register']);
    Route::post('login', [AuthController::class, 'login']);
    Route::get('profile', [AuthController::class, 'profile']);
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::middleware(['jwt.verify'])->group(function () {
    // product routing
    // Route::get('products', [ProductController::class, 'index']);
    Route::post('products', [ProductController::class, 'create']);
    // Route::get('products/{id}', [ProductController::class, 'show']);
    Route::put('products/{id}', [ProductController::class, 'update']);
    Route::delete('products/{id}', [ProductController::class, 'destroy']);
    // product_catalog routing
    Route::get('products_catalog', [ProductCatalogController::class, 'index']);
    Route::post('products_catalog', [ProductCatalogController::class, 'create']);
    Route::get('products_catalog/{id}', [ProductCatalogController::class, 'show']);
    Route::put('products_catalog/{id}', [ProductCatalogController::class, 'update']);
    Route::delete('products_catalog/{id}', [ProductCatalogController::class, 'destroy']);
    // user routing
    Route::get('users', [UserController::class, 'read']);
    Route::post('users', [UserController::class, 'create']);
    Route::put('users/{id}', [UserController::class, 'update']);
    Route::delete('users/{id}', [UserController::class, 'destroy']);
    // order routing
    Route::get('orders', [OrderController::class, 'index']);
    Route::get('orders/user/{id}', [OrderController::class, 'getOrdersByUserId']);
    Route::post('order', [OrderController::class, 'create']);
    Route::get('order/{id}', [OrderController::class, 'show']);
    Route::put('order/{id}', [OrderController::class, 'update']);
});

Route::get('products', [ProductController::class, 'index']);
Route::get('products/{id}', [ProductController::class, 'show']);

Route::get('catalog', [ProductCatalogController::class, 'getAll']);
Route::get('products/catalog/{catalog}', [ProductController::class, 'getProductByCatalog']);