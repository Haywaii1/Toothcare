<?php

return [

    'defaults' => [
        'guard' => 'api', // Set default to 'api' if using Sanctum for API authentication
        'passwords' => 'users',
    ],

    'guards' => [
        'web' => [
            'driver' => 'session', // Use 'session' for web authentication
            'provider' => 'users',
        ],

        'api' => [
            'driver' => 'sanctum', // Sanctum should be used only for API authentication
            'provider' => 'users',
        ],
    ],

    'providers' => [
        'users' => [
            'driver' => 'eloquent',
            'model' => App\Models\User::class,
        ],
    ],

    'passwords' => [
        'users' => [
            'provider' => 'users',
            'table' => 'password_reset_tokens',
            'expire' => 60,
            'throttle' => 60,
        ],
    ],

    'password_timeout' => 10800,

];
