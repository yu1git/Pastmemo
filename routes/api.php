<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MemoController;

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

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// function mapApiRoutes()
// {
//     Route::prefix('api')
//          ->middleware('web') // ★ 'api' → 'web' に変更
//          ->namespace($this->namespace)
//          ->group(base_path('routes/api.php'));
// }

// メモ新規作成
Route::apiResource('/memos',MemoController::class);

// ログイン
//Route::post('/login', 'Auth\LoginController@login')->name('login');