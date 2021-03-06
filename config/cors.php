<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Cross-Origin Resource Sharing (CORS) Configuration
    |--------------------------------------------------------------------------
    |
    | Here you may configure your settings for cross-origin resource sharing
    | or "CORS". This determines what cross-origin operations may execute
    | in web browsers. You are free to adjust these settings as needed.
    |
    | To learn more: https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    |
    */

    //許可するCORSヘッダーを出力するパスの設定
    'paths' => ['api/*', 'api/login','api/logout','api/register','sanctum/csrf-cookie'],

    //許可するHTTPメソッドの設定
    'allowed_methods' => ['*'],

    //許可するドメインの設定
    'allowed_origins' => ['*'],

    //許可するドメインのパターン
    'allowed_origins_patterns' => [],

    //許可するヘッダーの設定
    'allowed_headers' => ['*'],

    //レスポンスヘッダーの公開指定
    'exposed_headers' => [],

    //ブラウザのキャッシュの保管期間
    'max_age' => 0,

    //クッキーなどの認証の許可
    'supports_credentials' => true,

];
