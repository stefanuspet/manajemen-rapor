<?php

namespace App\Http\Controllers;

use App\Models\Semester;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SemesterController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Semester/Index', [
            'semesters' => Semester::all(),
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'nama_semester' => 'required',
            'tahun_ajaran' => 'required',
            'status' => 'required',
        ]);

        Semester::create($request->all());

        return redirect()->back();
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'nama_semester' => 'required',
            'tahun_ajaran' => 'required',
            'status' => 'required',
        ]);

        Semester::find($id)->update($request->all());

        return redirect()->back();
    }

    public function destroy($id)
    {
        Semester::destroy($id);

        return redirect()->back();
    }
}
