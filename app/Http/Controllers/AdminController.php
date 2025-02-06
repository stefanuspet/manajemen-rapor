<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    // index
    public function index()
    {
        return Inertia::render('Admin/Dashboard');
    }
}
