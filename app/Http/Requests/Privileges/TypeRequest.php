<?php

namespace App\Http\Requests\Privileges;

use App\Models\Privileges\Type;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TypeRequest extends FormRequest
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
            'name' => [
                'required',
                'max:255',
                function ($attribute, $value, $fail) {
                    if ($this->id) {
                        if (Type::withTrashed()->where(DB::raw('LOWER(name)'), Str::lower($value))->where('id', '!=', Crypt::decryptString($this->id))->get()->count()) {
                            $fail("The ".$attribute." has already been taken.");
                        }
                    } else {
                        if (Type::withTrashed()->where(DB::raw('LOWER(name)'), Str::lower($value))->get()->count()) {
                            $fail("The ".$attribute." has already been taken.");
                        }
                    }
                },
            ],
        ];
    }
}
