<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MemosTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $param = [
            'parent_id' => null,
            'title' => 'あ',
            'content' => 'あいうえお',
            'heart' => false,
            'inspiration' => false, 
            'created_at' => now(),
            'updated_at' => now(),
        ];
        DB::table('memos')->insert($param);

        $param = [
            'parent_id' => 1,
            'title' => 'か',
            'content' => 'かきくけこ',
            'heart' => false,
            'inspiration' => false, 
            'created_at' => now(),
            'updated_at' => now(),
        ];
        DB::table('memos')->insert($param);
        
        // $faker = \Faker\Factory::create('ja_JP');
        // for ($i = 0; $i < 10; $i++){
        //     $param = [
        //         'parent_id' => '1',
        //         'title' => $faker->realText(10),
        //         'content' => $faker->realText(20),
        //         'heart' => 'false',
        //         'inspiration' => 'false',
        //         'created_at' => now(),
        //         'updated_at' => now(),
        //     ];
        //     DB::table('memos')->insert($param);
        // }
    }
}

