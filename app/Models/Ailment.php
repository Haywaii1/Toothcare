<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Ailment extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id', 'date', 'time', 'name', 'email', 'phone', 'message', 'ailment'
    ];
}
