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
        return $this->updateLove($request, 5);
    }

    public function decreaseUpdateLove(Request $request)
    {
        return $this->updateLove($request, -1);
    }
}
