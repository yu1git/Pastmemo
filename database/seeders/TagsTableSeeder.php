<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Memo;
use App\Models\Tag;

class TagsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $faker = \Faker\Factory::create('ja_JP');
        for ($i = 0; $i < 10; $i++){
            $param = [
                'word' => $faker->realText(10),
                'created_at' => now(),
                'updated_at' => now(),
            ];
            DB::table('tags')->insert($param);
        }

        for($i = 0; $i < 10; $i++){
            DB::table('memo_tag')->insert([
                'memo_id' => Memo::all()->random()->id,
                'tag_id' => Tag::all()->random()->id,
                'created_at' => now(),
                'updated_at' => now(),
            ]);
        }
    }
}
