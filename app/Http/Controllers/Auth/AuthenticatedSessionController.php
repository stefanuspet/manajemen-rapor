<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class AuthenticatedSessionController extends Controller
{
    /**
     * Display the login view.
     */
    public function create(): Response
    {
        if (Auth::check()) {
            switch (Auth::user()->role) {
                case 'admin':
                    return redirect()->route('admin.dashboard');
                case 'walikelas':
                    return redirect()->route('wali.dashboard');
                case 'kepala_sekolah':
                    return redirect()->route('kepala.dashboard');
                case 'siswa':
                    return redirect()->route('siswa.dashboard');
                default:
                    break;
            }
        }
        return Inertia::render('Auth/Login', [
            'canResetPassword' => Route::has('password.request'),
            'status' => session('status'),
        ]);
    }

    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request): RedirectResponse
    {
        try {
            $request->authenticate();

            $request->session()->regenerate();

            $user = Auth::user();

            // Redirect berdasarkan role
            return redirect()->intended(match ($user->role) {
                'admin' => route('admin.dashboard'),
                'wali_kelas' => route('wali.dashboard'),
                'kepala_sekolah' => route('kepala.dashboard'),
                'siswa' => route('siswa.dashboard'),
                default => route('dashboard'),
            });
        } catch (ValidationException $e) {
            return back()->withErrors([
                'email' => 'Email atau password salah.',
            ])->withInput();
        }
    }

    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request): RedirectResponse
    {
        Auth::guard('web')->logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
