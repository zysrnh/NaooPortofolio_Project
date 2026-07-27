<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;

class UserProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = Auth::user();

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => ['required', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'password' => 'nullable|string|min:8',
            'avatar' => 'nullable',
        ]);

        $user->name = $validated['name'];
        $user->email = $validated['email'];

        if (!empty($validated['password'])) {
            $user->password = Hash::make($validated['password']);
        }

        // Processing Avatar Photo upload
        if ($request->hasFile('avatar_file')) {
            $file = $request->file('avatar_file');
            $extension = $file->getClientOriginalExtension();
            $base64 = 'data:image/' . $extension . ';base64,' . base64_encode(file_get_contents($file->getRealPath()));
            $user->avatar = $base64;
        } elseif ($request->filled('avatar')) {
            $user->avatar = $request->input('avatar');
        }

        $user->save();

        return response()->json([
            'message' => 'Profil berhasil diperbarui!',
            'user' => $user->fresh()
        ]);
    }
}
