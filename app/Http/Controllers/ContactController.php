<?php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\ContactNotification;

class ContactController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string',
        ]);

        $contact = Contact::create($request->all());

        // Send notification email to admin
        Mail::to('ayotundeonasanya@yahoo.com')->send(new ContactNotification($contact));

        return response()->json(['message' => 'Message sent successfully!'], 201);
    }
}
