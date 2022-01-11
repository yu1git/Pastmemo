<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('users')->insert([
            'name' => 'UserName',
            'email' => 'User@mail.com',
            'password' => bcrypt('12345678'),
        ]);
        
        $faker = \Faker\Factory::create('ja_JP');
        for ($i = 0; $i < 10; $i++){
            $param = [
                'name' => $faker->name,
                'email' => $faker->email,
                'password' => $faker->password,
                'remember_token' => $faker->randomDigit,
                'created_at' => now(),
                'updated_at' => now(),
            ];
            DB::table('users')->insert($param);
        }
    }
}
