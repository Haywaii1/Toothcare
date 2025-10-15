<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens; // 👈 ADD THIS

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable; // 👈 MAKE SURE THIS IS INCLUDED

    protected $fillable = [
        'name',
        'email',
        'phone',
        'password',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    public function chats()
    {
        return $this->hasMany(Chat::class, 'user_id');
    }
}
