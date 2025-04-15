<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Services\EggService;

class FootballController extends Controller
{
    public function overview(Request $request, EggService $eggService)
    {

        return inertia('Football');
    }

}
