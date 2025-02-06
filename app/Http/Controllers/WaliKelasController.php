<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class WaliKelasController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('WaliKelas/Dashboard');
    }
}
