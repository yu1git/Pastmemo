<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\MemoController;
use App\Http\Controllers\Auth\LoginController;
use App\Http\Controllers\Auth\RegisterController;
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

// ログイン・ログアウト
Route::post('/login',[LoginController::class, 'login']);
Route::post('/logout',[LoginController::class, 'logout']);
//会員登録
Route::post('/register', [RegisterController::class, 'register']);
// 認証済みでないと許可しない
Route::group(["middleware" => ["auth:sanctum"]], function () {
    // メモ新規作成
    Route::apiResource('/memos',MemoController::class);
});
