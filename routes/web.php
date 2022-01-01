<?php

use Illuminate\Support\Facades\Route;

use App\Http\Controllers\TestController;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/{any?}', function () {
//     return view('index');
// })->where('any', '.+');

Route::get('/{any}', function(){
    return view('index');
})->where('any', '.*');

//Auth::routes();

//Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');


// Auth::routes(['verify' => true]);	// メール認証を有効化

// Route::middleware('auth')->group(function(){
//     // 要ユーザ認証
//     Route::get('/test', [TestController::class, 'index'])->name('test.index');
//     Route::middleware('verified')->group(function(){
//         // 要メール認証
//         Route::get('/test/create', [TestController::class, 'create'])->name('test.create');
//     });
// });


