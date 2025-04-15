<?php

use App\Models\Newsletter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

class NewsletterController
{
    public function subscribe(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:newsletters,email',
        ]);

        $newsletter = Newsletter::create([
            'email' => $request->email,
        ]);

        // Send notification email
        Mail::to($request->email)->send(new \App\Mail\NewsletterSubscribed());

        return response()->json(['message' => 'Subscription successful!']);
    }
}

