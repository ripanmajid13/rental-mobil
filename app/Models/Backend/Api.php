<?php

namespace App\Models\Backend;

use App\Models\Privileges\Permission;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\SoftDeletes;

class Api extends Model
{
    use HasFactory, SoftDeletes;

    public $table = 'backend_apis';

    public function permissions(): HasMany
    {
        return $this->hasMany(Permission::class, 'name', 'permission');
    }
}
