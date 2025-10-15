<?php

namespace App\Http\Controllers;

use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    public function getDoctorsByService(Request $request)
    {
        $service = $request->query('ailment');
        $perPage = $request->query('per_page', 5); // Default to 5 doctors per page

        $query = Doctor::query();

        if ($service) {
            $query->where('service', 'LIKE', '%' . $service . '%');
        }

        $doctors = $query->paginate($perPage);

        return response()->json($doctors);
    }
    
}

