<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Doctor;

class DoctorSeeder extends Seeder
{
    public function run()
    {
        $doctors = [
            [
                'name' => 'Dr. John Doe',
                'service' => 'General checkup',
                'experience' => 10,
                'availability' => 'Monday - Friday',
                'rating' => 4.8,
            ],
            [
                'name' => 'Dr. Jane Smith',
                'service' => 'Cleaning',
                'experience' => 8,
                'availability' => 'Tuesday - Saturday',
                'rating' => 4.5,
            ],
            [
                'name' => 'Dr. Alex Brown',
                'service' => 'Cavity filling',
                'experience' => 12,
                'availability' => 'Monday - Thursday',
                'rating' => 4.7,
            ],
            [
                'name' => 'Dr. Emma Wilson',
                'service' => 'Root canal',
                'experience' => 15,
                'availability' => 'Wednesday - Sunday',
                'rating' => 4.9,
            ],
            [
                'name' => 'Dr. Robert Davis',
                'service' => 'Extraction',
                'experience' => 7,
                'availability' => 'Monday - Friday',
                'rating' => 4.6,
            ],
        ];

        foreach ($doctors as $doctor) {
            Doctor::create($doctor);
        }
    }
}
