<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class KepalaSekolahController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('KepalaSekolah/Dashboard');
    }
}
