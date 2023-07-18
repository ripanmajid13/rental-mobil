<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Privileges\Role;
use App\Models\Privileges\User;
use App\Models\UserRental;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;

class RegisterController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $request->validate([
            'username'      => ['required', 'min:5', 'max:255', Rule::unique(User::class, 'username')->whereNull('deleted_at')],
            'password'      => ['required'],
            'first_name'    => ['required', 'max:255'],
            'last_name'     => ['max:255'],
            'alamat'        => ['required'],
            'nomor_telepon' => ['required', Rule::unique(UserRental::class, 'nomor_telepon')->whereNull('deleted_at')],
            'nomor_sim'     => ['required', Rule::unique(UserRental::class, 'nomor_sim')->whereNull('deleted_at')],
        ]);

        DB::beginTransaction();
        try {
            $model = new User();
            $model->username   = $request->username;
            $model->password   = bcrypt(Crypt::decryptString($request->password));
            $model->first_name = $request->first_name;
            $model->last_name  = $request->last_name;
            $model->email      = fake()->unique()->safeEmail();
            $model->save();

            $modelRental = new UserRental();
            $modelRental->user_id = $model->id;
            $modelRental->alamat   = $request->alamat;
            $modelRental->nomor_telepon   = $request->nomor_telepon;
            $modelRental->nomor_sim   = $request->nomor_sim;
            $modelRental->save();

            User::findOrFail($model->id)->assignRole(2);

            DB::commit();

            Auth::attempt([ 'username' => $model->username, 'password' =>  $model->password ]);

            return response(Crypt::encryptString(json_encode(HelperDeveloperToken($model->id, $request->device))), 200);
        } catch (\Exception $e) {
            DB::rollback();
            throw $e;
        } catch (\Throwable $e) {
            DB::rollback();
            throw $e;
        }
    }
}
