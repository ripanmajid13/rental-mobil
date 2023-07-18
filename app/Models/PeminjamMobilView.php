<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Crypt;

class PeminjamMobilView extends Model
{
    use HasFactory, SoftDeletes;

    public $table = 'peminjaman_mobils_v';

    protected $hidden = [
        'created_at',
        'updated_at',
        'deleted_at',
        'created_by',
        'updated_by',
        'deleted_by',
    ];

    protected function id(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => Crypt::encryptString($value),
        );
    }
}
