<?php
// app/Http/Controllers/ContactController.php

namespace App\Http\Controllers;

use App\Models\Contact;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    /**
     * GET /api/contact
     * Public — dipakai Home.tsx untuk nampilin kontak
     */
    public function index()
    {
        return response()->json(
            Contact::orderBy('sort_order')->get()
        );
    }

    /**
     * GET /api/contact/visible
     * Public — hanya kontak yang is_visible=true
     */
    public function indexVisible()
    {
        return response()->json(
            Contact::where('is_visible', true)->orderBy('sort_order')->get()
        );
    }

    /**
     * PUT /api/contact
     * Protected — simpan semua kontak sekaligus (bulk upsert)
     * Menerima array of contacts dari HomepageManager
     */
    public function bulkUpdate(Request $request)
    {
        $items = $request->validate([
            '*.id'          => 'nullable|integer',
            '*.platform'    => 'required|string|max:50',
            '*.label'       => 'required|string|max:100',
            '*.value'       => 'required|string|max:255',
            '*.url'         => 'required|string|max:500',
            '*.is_visible'  => 'boolean',
            '*.sort_order'  => 'integer',
            '*.icon_color'  => 'nullable|string|max:20',
        ]);

        // Ambil semua ID yang dikirim (yang ID-nya positif = existing)
        $incomingIds = collect($items)->pluck('id')->filter(fn($id) => $id && $id > 0)->values();

        // Hapus yang tidak ada di incoming list
        Contact::whereNotIn('id', $incomingIds->toArray())->delete();

        $result = [];
        foreach ($items as $index => $item) {
            $id = isset($item['id']) && $item['id'] > 0 ? $item['id'] : null;

            $data = [
                'platform'   => $item['platform'],
                'label'      => $item['label'],
                'value'      => $item['value'],
                'url'        => $item['url'],
                'is_visible' => $item['is_visible'] ?? true,
                'sort_order' => $index,
                'icon_color' => $item['icon_color'] ?? '#9ECCFA',
            ];

            if ($id) {
                $contact = Contact::find($id);
                if ($contact) {
                    $contact->update($data);
                } else {
                    $contact = Contact::create($data);
                }
            } else {
                $contact = Contact::create($data);
            }

            $result[] = $contact->fresh();
        }

        return response()->json($result);
    }
}