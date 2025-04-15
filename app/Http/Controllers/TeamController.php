<?php

namespace App\Http\Controllers;

use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    // Used to seed the team table (you can trigger this manually once)
    public function seedTeamMembers()
    {
        $members = [
            [
                'name' => 'Dr. John Doe',
                'role' => 'Dentist',
                'experience' => 10,
                'specialty' => 'General checkup',
                'availability' => 'Monday - Friday',
                'bio' => 'Dr. John is a seasoned general dentist with a decade of experience treating patients of all ages.',
                'image' => 'img/team-5.jpg',
            ],
            [
                'name' => 'Dr. Jane Smith',
                'role' => 'Dental Hygienist',
                'experience' => 8,
                'specialty' => 'Cleaning',
                'availability' => 'Tuesday - Saturday',
                'bio' => 'Dr. Jane specializes in dental cleanings and oral hygiene education with a friendly approach.',
                'image' => 'img/team-4.jpg',
            ],
            [
                'name' => 'Dr. Alex Brown',
                'role' => 'Dentist',
                'experience' => 12,
                'specialty' => 'Cavity filling',
                'availability' => 'Monday - Thursday',
                'bio' => 'Dr. Alex focuses on restorative dentistry, especially filling cavities with minimal discomfort.',
                'image' => 'img/team-3.jpg',
            ],
            [
                'name' => 'Dr. Emma Wilson',
                'role' => 'Endodontist',
                'experience' => 15,
                'specialty' => 'Root canal',
                'availability' => 'Wednesday - Sunday',
                'bio' => 'Dr. Emma is known for her precision and compassion during complex root canal procedures.',
                'image' => 'img/team-2.jpg',
            ],
            [
                'name' => 'Dr. Robert Davis',
                'role' => 'Oral Surgeon',
                'experience' => 7,
                'specialty' => 'Extraction',
                'availability' => 'Monday - Friday',
                'bio' => 'Dr. Robert handles oral surgeries and extractions with a focus on patient care and recovery.',
                'image' => 'img/team-1.jpg',
            ],
        ];

        foreach ($members as $member) {
            Team::create($member);
        }

        return response()->json(['message' => 'Team members seeded successfully!']);
    }

    // Used to return all team members publicly (this is your index)
    public function index()
    {
        // Fetch all team members from the database
        $teamMembers = Team::all();

        // Return team members as a JSON response
        return response()->json($teamMembers);
    }

//     public function show($id)
// {
//     $member = Team::findOrFail($id);
//     return response()->json($member);
// }



}
