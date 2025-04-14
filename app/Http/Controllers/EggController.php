<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Egg;

class EggController extends Controller
{
    public function updateLove(Request $request)
    {
        $user = auth()->user();

        $egg = $user->egg;

        $egg->love = max(0, $egg->love - 5);

        $egg->save();

        return response()->json([
            'love' => $egg->love
        ]);
    }

    public function clickUpdateLove(Request $request)
    {

    }
}
