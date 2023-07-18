<?php

namespace App\Http\Requests\Privileges;

use App\Models\Privileges\User;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        return [
            'first_name'    => ['required', 'max:255'],
            'last_name'     => ['required', 'max:255'],
            'date_of_birth' => ['required'],
            'email'         => ['email', 'max:255', Rule::unique(User::class, 'email')->whereNull('deleted_at')->ignore($this->id ? Crypt::decryptString($this->id) : null)],
            'username'      => ['required', 'max:255', Rule::unique(User::class, 'username')->whereNull('deleted_at')->ignore($this->id ? Crypt::decryptString($this->id) : null)],
            'password'      => [$this->id ? 'nullable' : 'required'],
            'active'        => ['required'],
        ];
    }
}
