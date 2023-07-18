<?php

namespace App\Models\Privileges;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Permission\Models\Permission as Model;

class Permission extends Model
{
    use HasFactory, SoftDeletes;

    public $table = 'privileges_permissions';
}
