<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;

class Admin extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;


    protected $fillable = ['name', 'email', 'password'];

    protected $hidden = ['password'];

    protected $guard = 'admin';


    public function chats()
    {
        return $this->hasMany(Chat::class, 'admin_id');
    }
}
