<?php

namespace App\Http\Controllers; // ✅ Ensure correct namespace

use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller // ✅ Extend base Controller
{
    public function getDoctorsByService(Request $request)
    {
        $service = $request->query('service'); // Get service from query params

        if (!$service) {
            return response()->json(['error' => 'Service parameter is required'], 400);
        }

        $doctors = Doctor::where('service', $service)->get();

        return response()->json($doctors);
    }
}

