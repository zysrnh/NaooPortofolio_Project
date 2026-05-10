<?php

namespace App\Http\Controllers;

use App\Models\Supporter;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class SupporterController extends Controller
{
    public function index()
    {
        return response()->json(Supporter::where('is_visible', true)->get());
    }

    public function adminIndex()
    {
        return response()->json(Supporter::all());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'role' => 'required|string',
            'image_file' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['name', 'role', 'description', 'is_visible']);
        
        if ($request->hasFile('image_file')) {
            $path = $request->file('image_file')->store('supporters', 'public');
            $data['image'] = Storage::url($path);
        }

        $supporter = Supporter::create($data);
        return response()->json($supporter);
    }

    public function update(Request $request, Supporter $supporter)
    {
        $request->validate([
            'name' => 'required|string',
            'image_file' => 'nullable|image|max:2048',
        ]);

        $data = $request->only(['name', 'role', 'description', 'is_visible']);

        if ($request->hasFile('image_file')) {
            // Hapus foto lama
            if ($supporter->image) {
                $oldPath = str_replace('/storage/', '', $supporter->image);
                Storage::disk('public')->delete($oldPath);
            }
            $path = $request->file('image_file')->store('supporters', 'public');
            $data['image'] = Storage::url($path);
        }

        $supporter->update($data);
        return response()->json($supporter);
    }

    public function destroy(Supporter $supporter)
    {
        if ($supporter->image) {
            $oldPath = str_replace('/storage/', '', $supporter->image);
            Storage::disk('public')->delete($oldPath);
        }
        $supporter->delete();
        return response()->json(['ok' => true]);
    }
}
