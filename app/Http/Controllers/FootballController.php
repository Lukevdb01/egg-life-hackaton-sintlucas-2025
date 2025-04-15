<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\EggService;

class FootballController extends Controller
{
    public function overview(Request $request, EggService $eggService)
    {
        $user = $request->user();
        $eggData = $eggService->getEggData($user);

        return inertia('football', [
            'page_data' => [
                'egg' => $eggData,
                'user' => $user
            ],
        ]);
    }

}
