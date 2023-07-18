<?php

namespace App\Http\Requests\Privileges;

use App\Models\Privileges\Role;
use App\Models\Privileges\Type;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;

class RoleRequest extends FormRequest
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
            'display' => [
                'required',
                'max:100',
                function ($attribute, $value, $fail) {
                    if ($this->id) {
                        if (Role::where(DB::raw('LOWER(display)'), Str::lower($value))->where('privileges_type_id', $this->type)->where('id', '!=', Crypt::decryptString($this->id))->get()->count()) {
                            $fail("The ".$attribute." has already been taken.");
                        }
                    } else {
                        if (Role::where(DB::raw('LOWER(display)'), Str::lower($value))->where('privileges_type_id', $this->type)->get()->count()) {
                            $fail("The ".$attribute." has already been taken.");
                        }
                    }
                }
            ],
            'type' => [
                'required',
                Rule::in(Type::get()->pluck('id'))
            ]
        ];
    }
}
