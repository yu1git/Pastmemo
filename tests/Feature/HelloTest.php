<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Tests\TestCase;
use App\Models\User;

class HelloTest extends TestCase
{
    // use RefreshDatabase;

    // private $accessToken = null;

    // public function setUp(): void
    // {
    //     parent::setUp();

    //     // テストユーザ作成
    //     User::create([
    //         'name' => 'sample user',
    //         'email' => 'sample@sankosc.co.jp',
    //         'password' => Hash::make('sample123'),
    //     ]);

    //     // 2.ログインAPIでアクセストークン取得
    //     $response = $this->post('/api/login', [
    //         'email' => 'sample@sankosc.co.jp',
    //         'password' => 'sample123'
    //     ]);
    //     $response->assertOk();
    //     // 3.アクセストークンを変数に保存しておく
    //     $this->accessToken = $response->decodeResponseJson('access_token');
    // }
    /**
     * @test
     * @group testing
     */
    // public function getWithAuth()
    // {
    //     $response = $this->get('/api/user', [
    //         'Authorization' => 'Bearer '.$this->accessToken
    //     ]);
    //     $response->assertOk()->assertJsonFragment([
    //         'name' => 'sample user'
    //     ]);
    // }

    /**
    * A basic feature test example.
    *
    * @return void
    */
//    public function test_正しいパスワードの場合()
//    {
//        $response = $this->get('api/login');          
//        $response->assertStatus(200);

//        // ログインする
//       $response = $this->post('api/login', ['email' => $this->user->email, 'password' => 'Test1234']);
//        // リダイレクトでページ遷移してくるのでstatusは302
//       $response->assertStatus(302);
//        // リダイレクトで帰ってきた時のパス
//       $response->assertRedirect('/');
//        // このユーザーがログイン認証されているか
//       $this->assertAuthenticatedAs($this->user);

//    }
     
    /**
     * ログイン認証テスト
     */
    // public function testLogin(): void
    // {
    //     // 作成したテストユーザのemailとpasswordで認証リクエスト
    //     $response = $this->post('/api/login',  [
    //         'email' => $this->user->email,
    //         'password' => 'password',
    //     ]);

    //     // 正しいレスポンスが返り、ユーザ名が取得できることを確認
    //     $response
    //         ->assertStatus(200)
    //         ->assertJson(['name' => $this->user->name]);

    //     // 指定したユーザーが認証されていることを確認
    //     $this->assertAuthenticatedAs($this->user);
    // }

    // /**
    //  * ログアウトテスト
    //  */
    // public function testLogout(): void
    // {
    //     // actingAsヘルパで現在認証済みのユーザーを指定する
    //     $response = $this->actingAs($this->user);

    //     // ログアウトページへリクエストを送信
    //     $response->post('/api/logout');

    //     // ログアウト後のレスポンスで、HTTPステータスコードが正常であることを確認
    //     $response->assertStatus(200);

    //     // ユーザーが認証されていないことを確認
    //     $this->assertGuest();
    // }

    
    /** Authファサードをモックする方法@test */
    // public function ログインしていない場合のテスト()
    // {
    //     Auth::shouldReceive('check')->andReturn(false);
    //     $response = $this->get('/');
    //     $response->assertViewHas('data', 'ログインしていません');
    // }
    // /** @test */
    // public function ログインしている場合のテスト()
    // {
    //     Auth::shouldReceive('check')->andReturn(true);
    //     $response = $this->get('/');
    //     $response->assertViewHas('data', 'ログインしています');
    // }
}
