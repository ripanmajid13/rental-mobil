<?php

namespace App\Http\Requests\Privileges;

use App\Models\Privileges\Language;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Validation\Rule;

class LanguageRequest extends FormRequest
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
            'key' => [
                'required',
                'max:255',
                Rule::unique(Language::class, 'key')
                    ->whereNull('deleted_at')
                    ->ignore($this->id ? Crypt::decryptString($this->id) : null)
            ],
            'lang_en' => ['max:255'],
            'lang_id' => ['max:255'],
        ];
    }
}
