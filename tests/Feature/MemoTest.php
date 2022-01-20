<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Tests\TestCase;
use App\Models\User;

class MemoTest extends TestCase
{
    /**
     * A basic feature test example.
     *
     * @return void
     */

     private $accessToken = null;

     protected function setUp(): Void
     {
         // 必ずparent::setUp()を呼び出す
         parent::setUp();
         // テストユーザー作成
        $this->user = User::factory()->create();
     }

     /**
      * ログインテスト
      */
     public function testLogin(): void
     {
         // 作成したテストユーザー認証リクエスト
         // actingAs() 現在認証済みのユーザーを設定できるヘルパメソッド
         // actingAs($this->user)で新規作成したユーザーで認証状態にしている
        $response = $this->actingAs($this->user)->get('/');
        
        // ステータスコードが200番であったか
        $response->assertStatus(200);
        
        // 指定したユーザーが認証されていることを確認
        $this->assertAuthenticatedAs($this->user);
    

     }
    
     // api/memos のテスト
    public function test_getMemo()
    {
        $response = $this->actingAs($this->user)
                        // アクセス確認
                        ->get('/api/memos')
                        ->assertStatus(200);
    }

    /**
      * ログアウトテスト
      */
    public function testLogout(): void
    {
        // actingAsヘルパで認証済みユーザーを指定する
        $response = $this->actingAs($this->user);

        // ログアウトページにリクエストを送信
        // vuex内でpostを送ることになってるけど、getでは無いかな？
        $response->post('/api/logout')
                 ->assertStatus(200);

        //　認証が解除されているか
        $this->assertGuest();
    }
}
