<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class DoctorFactory extends Factory
{
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'service' => $this->faker->randomElement(['Cavity Filling', 'Extraction', 'Root Cleaner', 'General Checkup']),
        ];
    }
}
