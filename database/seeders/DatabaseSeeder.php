<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Privileges\User;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        DB::table('privileges_users')->insert([
            [
                'first_name' => 'Super',
                'last_name' => 'Admin',
                'username' => 'superadmin',
                'email' => 'ripanmajid13@gmail.com',
                'email_verified_at' => now(),
                'password' => Hash::make('P@ssw0rd'),
                'remember_token' => Str::random(10),
                'created_at'   => Carbon::now(),
                'updated_at'   => Carbon::now(),
            ],
        ]);

        $this->command->info('Privileges User Developer Done.');

        DB::table('privileges_types')->insert([
            [
                'name' => 'Default',
            ],
        ]);

        $this->command->info('Privileges Type Seeder Done.');

        DB::table('privileges_roles')->insert([
            [
                'name'               => 'default-super-admin',
                'display'            => 'Super Admin',
                'guard_name'         => 'api',
                'privileges_type_id' => 1,
                'created_at'         => Carbon::now(),
                'updated_at'         => Carbon::now(),
            ],
            [
                'name'               => 'default-guest',
                'display'            => 'Guest',
                'guard_name'         => 'api',
                'privileges_type_id' => 1,
                'created_at'         => Carbon::now(),
                'updated_at'         => Carbon::now(),
            ],
        ]);

        $this->command->info('RoleSeeder Done.');


        DB::table('privileges_model_has_roles')->insert([
            [
                'privileges_role_id' => 1,
                'model_type' => 'App\Models\Privileges\User',
                'model_id'   => 1,
            ],
        ]);

        for($i = 2; $i <= 50; $i++) {
            DB::table('privileges_model_has_roles')->insert([
                [
                    'privileges_role_id' => 2,
                    'model_type' => 'App\Models\Privileges\User',
                    'model_id'   => $i,
                ],
            ]);
        }

        $this->command->info('User Has Roles Seeder Done.');
    }
}
