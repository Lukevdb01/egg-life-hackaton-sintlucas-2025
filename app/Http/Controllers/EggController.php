<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Egg;

class EggController extends Controller
{
    public function updateLove(Request $request, int $change)
    {
        $user = auth()->user();
        $egg = $user->egg;

        $egg->love = max(0, min(100, $egg->love + $change));
        $egg->save();

        return response()->json([
            'love' => $egg->love,
        ]);
    }

    public function clickIncreaseUpdateLove(Request $request)
    {
        return $this->updateLove($request, 3
        );
    }

    public function decreaseUpdateLove(Request $request)
    {
        return $this->updateLove($request, -1);
    }

    public function uploadTemperature(Request $request, int $change): JsonResponse
    {
        $user = auth()->user();
        $egg = $user->egg;

        $egg->temperature = max(0, min(100, $egg->temperature + $change));
        $egg->save();

        return response()->json([
            'temperature' => $egg->temperature,
        ]);
    }

    public function decreaseUpdateTemperature(Request $request): JsonResponse
    {
        return $this->uploadTemperature($request, -1);
    }

    public function clickIncreaseUpdateTemp(Request $request): JsonResponse
    {
        return $this->uploadTemperature($request, 3);
    }

    public function stageOne(Request $request): JsonResponse
    {
        $user = auth()->user();
        $egg = $user->egg;

        if ($egg->love >= 50 && $egg->temperature >= 50 && !$egg->first_stage) {
            $egg->first_stage = true;
            $egg->save();

            return response()->json([
                'message' => 'Stage one activated!',
                'first_stage' => $egg->first_stage,
            ]);
        }

        return response()->json([
            'message' => 'Conditions not met for stage one.',
            'first_stage' => $egg->first_stage,
        ]);
    }

    public function stageTwo(Request $request): JsonResponse
    {
        $user = auth()->user();
        $egg = $user->egg;

        if ($egg->first_stage && !$egg->second_stage) {
            $egg->second_stage = true;
            $egg->save();

            return response()->json([
                'message' => 'Stage two activated!',
                'second_stage' => $egg->second_stage,
            ]);
        }

        return response()->json([
            'message' => 'Conditions not met for stage two.',
            'second_stage' => $egg->second_stage,
        ]);
    }
}
