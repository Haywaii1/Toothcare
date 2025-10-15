<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Admin;

class EnsureAdmin
{
    public function handle(Request $request, Closure $next)
    {
        if (!$request->user() instanceof Admin) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return $next($request);
    }
}
