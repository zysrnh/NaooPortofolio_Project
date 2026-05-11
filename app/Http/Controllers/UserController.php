<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        return response()->json(User::orderByDesc('created_at')->paginate(20));
    }

    public function destroy(User $user)
    {
        if ($user->id === auth()->id()) {
            return response()->json(['message' => 'Nggak bisa hapus diri sendiri bang!'], 422);
        }
        $user->delete();
        return response()->json(['ok' => true]);
    }
}
