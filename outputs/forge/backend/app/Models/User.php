<?php
namespace App\Models;
use Illuminate\Foundation\Auth\User as Authenticatable;
class User extends Authenticatable
{
    protected $fillable = ['name', 'email', 'password'];
    protected $hidden = ['password', 'api_token_hash', 'api_token_expires_at'];
    protected function casts(): array
    {
        return ['password' => 'hashed', 'api_token_expires_at' => 'datetime', 'completed' => 'array'];
    }
}
