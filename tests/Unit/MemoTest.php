<?php

namespace Tests\Unit;

use PHPUnit\Framework\TestCase;

use App\Models\Memo;
use Illuminate\Foundation\Testing\RefreshDatabase; //テストごとにDBリフレッシュ


// class MemoTest extends TestCase
// {
//     use RefreshDatabase;

//     /**
//      * A basic unit test example.
//      *
//      * @return void
//      */
//     public function test_example()
//     {
//         $this->assertTrue(true);
//     }

//     public function testModelAndFactory() 
//     {        
//         $persisted = Memo::factory()->create(); //永続化(内部的にsaveを行う)
//         $first = Memo::first(); //最初のモデルを取得

//         $this->assertEquals($persisted->id, $first->id);
//     }
// }