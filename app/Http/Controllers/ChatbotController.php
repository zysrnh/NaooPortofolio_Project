<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class ChatbotController extends Controller
{
    public function ask(Request $request)
    {
        $request->validate([
            'message' => 'required|string|max:1000',
            'history' => 'nullable|array',
        ]);

        $userMessage = trim($request->input('message'));
        $lowerMsg = strtolower($userMessage);

        // Quick Girlfriend Check
        if (str_contains($lowerMsg, 'pacar') || str_contains($lowerMsg, 'doi') || str_contains($lowerMsg, 'kekasih') || str_contains($lowerMsg, 'girlfriend')) {
            return response()->json(['reply' => 'Pacar Zaki namanya Riaa Riyanti Faturrohman.']);
        }

        $apiKey = env('GEMINI_API_KEY');

        $systemInstruction = "Kamu adalah Naoo Helper (asisten virtual yang mewakili Zaki Yusron Hasyimmi).

Konteks Latar Belakang Zaki (hanya gunakan jika pengguna bertanya tentang hal tersebut):
- Nama Lengkap: Zaki Yusron Hasyimmi.
- Pacar / Kekasih: Riaa Riyanti Faturrohman.
- Pekerjaan & Status: Full Stack Web Developer & Freelancer di Cyberlabs.
- Pendidikan: Mahasiswa aktif Institut Digital Ekonomi (IDE) LPKIA tingkat 2 semester 1.
- Organisasi: Anggota HIMA IF (Himpunan Mahasiswa Informatika LPKIA).
- Asal Sekolah: Alumni SMKN 7 Baleendah.
- Keahlian Teknis: Full Stack Web Development (React 19, TypeScript, Laravel 12, Tailwind CSS v4, Inertia.js, Vite, Node.js, SQL, REST API).

Gaya Komunikasi & Aturan:
1. Nama kamu adalah Naoo Helper.
2. Gunakan bahasa Indonesia santai, ramah, dan sopan seperti pengembang web muda (gunakan 'aku' dan 'kamu').
3. JANGAN PERNAH memakai kata 'bro'!
4. JANGAN sebutkan atau jabarkan semua latar belakang (sekolah, kampus, tempat kerja, pacar) di awal atau di setiap jawaban secara berlebihan. Informasi hanya dipakai bila relevan dengan pertanyaan user.
5. JANGAN gunakan emoji! Hindari pemakaian emoji dalam jawaban.
6. Jawab pertanyaan seputar proyek, keahlian, atau diskusi teknis dengan jelas, santai, dan to the point.";

        $contents = [];
        $history = $request->input('history', []);
        
        foreach (array_slice($history, -6) as $h) {
            if (isset($h['sender']) && isset($h['text'])) {
                $role = $h['sender'] === 'user' ? 'user' : 'model';
                $contents[] = [
                    'role' => $role,
                    'parts' => [['text' => $h['text']]]
                ];
            }
        }

        $contents[] = [
            'role' => 'user',
            'parts' => [['text' => $userMessage]]
        ];

        if ($apiKey) {
            try {
                $endpoint = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={$apiKey}";
                
                $response = Http::withoutVerifying()->withHeaders([
                    'Content-Type' => 'application/json',
                ])->timeout(8)->post($endpoint, [
                    'systemInstruction' => [
                        'parts' => [['text' => $systemInstruction]]
                    ],
                    'contents' => $contents,
                    'generationConfig' => [
                        'temperature' => 0.7,
                        'maxOutputTokens' => 800,
                    ]
                ]);

                if ($response->successful()) {
                    $data = $response->json();
                    $reply = $data['candidates'][0]['content']['parts'][0]['text'] ?? null;
                    if ($reply) return response()->json(['reply' => trim($reply)]);
                }
            } catch (\Exception $e) {
                Log::warning('Gemini Exception: ' . $e->getMessage());
            }
        }

        // Smart Local Response Fallback
        if (str_contains($lowerMsg, 'proyek') || str_contains($lowerMsg, 'project') || str_contains($lowerMsg, 'portofolio')) {
            $reply = "Zaki sudah menggarap berbagai proyek web seperti Naoo Portfolio & CMS, Smart Color Picker Tool, Sistem Informasi Geografis, dan Dashboard Admin Analytics. Kamu bisa lihat lengkapnya di halaman Projects.";
        } else if (str_contains($lowerMsg, 'pendidikan') || str_contains($lowerMsg, 'kuliah') || str_contains($lowerMsg, 'lpkia')) {
            $reply = "Zaki adalah mahasiswa aktif tingkat 2 semester 1 di Institut Digital Ekonomi (IDE) LPKIA.";
        } else if (str_contains($lowerMsg, 'organisasi') || str_contains($lowerMsg, 'hima')) {
            $reply = "Zaki aktif sebagai anggota HIMA IF (Himpunan Mahasiswa Informatika) di LPKIA.";
        } else if (str_contains($lowerMsg, 'pekerjaan') || str_contains($lowerMsg, 'cyberlabs') || str_contains($lowerMsg, 'freelance')) {
            $reply = "Zaki saat ini berstatus sebagai Freelancer di Cyberlabs dan terbuka untuk proyek web development.";
        } else if (str_contains($lowerMsg, 'alumni') || str_contains($lowerMsg, 'smk') || str_contains($lowerMsg, 'baleendah')) {
            $reply = "Zaki merupakan alumni dari SMKN 7 Baleendah.";
        } else if (str_contains($lowerMsg, 'halo') || str_contains($lowerMsg, 'hai') || str_contains($lowerMsg, 'hi')) {
            $reply = "Halo! Aku Naoo Helper. Ada yang bisa aku bantu seputar proyek atau keahlian Zaki?";
        } else {
            $reply = "Aku Naoo Helper. Ada yang bisa aku bantu terkait proyek, keahlian, atau kontak Zaki?";
        }

        return response()->json(['reply' => $reply]);
    }
}
