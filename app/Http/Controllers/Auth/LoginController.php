<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\Privileges\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
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
            'username' => ['nullable', 'string'],
            'password' => ['nullable', 'string'],
            'device'   => 'required|string',
        ]);

        $loginType = filter_var($request->username, FILTER_VALIDATE_EMAIL) ? 'email' : 'username';

        // get user
        $user = User::where($loginType, $request->username)->first() ?? collect();

        // check false account
        if ($user->count() < 1) {
            return response()->json([
                'message' => "Account not found."
            ], 404);
        } else {
            // check false username, password and active
            if (!Auth::attempt([ $loginType => $request->username, 'password' => Crypt::decryptString($request->password), 'active' => 1 ])) {
                if ($user->active) {
                    return response()->json([
                        'message' => "Your username or password is wrong."
                    ], 404);
                } else {
                    return response()->json([
                        'message' => "Your account is not active."
                    ], 404);
                }
            } else {
                // check false match password
                if(!Hash::check(Crypt::decryptString($request->password), $user->password)) {
                    return response()->json([
                        'message' => "Account not found."
                    ], 404);
                } else {
                    return response(Crypt::encryptString(json_encode(HelperDeveloperToken($user->id, $request->device))), 200);
                }
            }
        }
    }
}
