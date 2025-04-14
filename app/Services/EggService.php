<?php

namespace App\Services;

use App\Models\User;

class EggService
{
    public function getEggData(User $user): array
    {
        $egg = $user->egg;

        if (!$egg) {
            // If something went wrong and the egg is missing (rare)
            throw new \Exception("Egg not found for user ID: {$user->id}");
        }

        return [
            'health' => $egg->health,
            'temperature' => $egg->temperature,
            'love' => $egg->love,
        ];
    }
}
