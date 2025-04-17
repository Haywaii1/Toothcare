<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Newsletter;
use App\Mail\NewsletterSubscribed;
use Illuminate\Support\Facades\Mail;

class NewsletterController extends Controller
{
    public function subscribe(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|unique:newsletters,email',
        ]);

        $newsletter = Newsletter::create([
            'email' => $validated['email'],
        ]);

        Mail::to($validated['email'])->send(new NewsletterSubscribed($validated['email']));

        return response()->json(['message' => 'Thanks for subscribing!']);
    }
}

