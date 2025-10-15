<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Appointment;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Mail\AppointmentConfirmation;

class AppointmentController extends Controller
{
    // Store a new appointment
    public function appointment(Request $request)
    {
        Log::info('Authenticated User:', ['user' => Auth::user()]);
        Log::info('Received request data:', $request->all());

        if (!Auth::check()) {
            return response()->json(['message' => 'Unauthenticated.'], 401);
        }

        $request->validate([
            'date' => 'required|date',
            'ailment' => 'required|string',
            'message' => 'nullable|string',
        ]);

        $user = Auth::user(); // Get the authenticated user

        $appointment = Appointment::create([
            'user_id' => $user->id,
            'name' => $user->name, // Automatically assign user's name
            'email' => $user->email, // Automatically assign user's email
            'phone' => $user->phone, // Ensure 'phone' exists in users table
            'date' => $request->date,
            'ailment' => $request->ailment,
            'message' => $request->message,
        ]);

        // Send the confirmation email after booking
        Mail::to($user->email)->send(new AppointmentConfirmation($appointment));

        return response()->json([
            'message' => 'Appointment booked successfully!',
            'appointment' => $appointment
        ], 201);
    }

    // Get all appointments for the logged-in user
    public function index()
    {
        $appointments = Appointment::where('user_id', Auth::id())->get();
        return response()->json($appointments);
    }
}
