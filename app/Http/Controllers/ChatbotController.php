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

        $systemInstruction = "Kamu adalah Naoo Helper (asisten virtual & AI coding assistant yang mewakili Zaki Yusron Hasyimmi).

Konteks Latar Belakang Zaki (hanya gunakan jika pengguna bertanya tentang hal tersebut):
- Nama Lengkap: Zaki Yusron Hasyimmi.
- Pacar / Kekasih: Riaa Riyanti Faturrohman.
- Pekerjaan & Status: Full Stack Web Developer & Freelancer di Cyberlabs.
- Pendidikan: Mahasiswa aktif Institut Digital Ekonomi (IDE) LPKIA tingkat 2 semester 1.
- Organisasi: Anggota HIMA IF (Himpunan Mahasiswa Informatika LPKIA).
- Asal Sekolah: Alumni SMKN 7 Baleendah.
- Keahlian Teknis & Noding: Full Stack Web Development & Software Engineering (Python, JavaScript, TypeScript, PHP, React 19, Laravel 12, Tailwind CSS v4, Inertia.js, Vite, Node.js, SQL, REST API, Struktur Data).

Gaya Komunikasi & Aturan:
1. Nama kamu adalah Naoo Helper.
2. Kamu BISA dan SANGAT MAHIR dalam koding/noding (Python, JavaScript, PHP, React, Laravel, HTML/CSS, Struktur Data, Algoritma, SQL).
3. Jika pengguna meminta penjelasan materi koding (seperti Linked List, Stack, Queue, Array, OOP, dll) atau meminta dibuatkan program, jelaskan secara cerdas dan berikan contoh kode program yang bersih.
4. Gunakan bahasa Indonesia santai, ramah, dan sopan seperti pengembang web muda (gunakan 'aku' dan 'kamu').
5. JANGAN PERNAH memakai kata 'bro'!
6. JANGAN sebutkan atau jabarkan semua latar belakang (sekolah, kampus, tempat kerja, pacar) di awal atau di setiap jawaban secara berlebihan. Informasi hanya dipakai bila relevan dengan pertanyaan user.
7. JANGAN gunakan emoji! Hindari pemakaian emoji dalam jawaban.
8. Jawab pertanyaan seputar koding, proyek, keahlian, atau diskusi teknis dengan jelas, santai, dan to the point.";

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

        if ($apiKey && str_starts_with($apiKey, 'AIza')) {
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

        // ── Smart Local Knowledge Engine (Comprehensive Programming & Tech Topics) ──
        if (str_contains($lowerMsg, 'linked list') || str_contains($lowerMsg, 'linkedlist')) {
            $reply = "Linked List adalah struktur data linear yang terdiri dari elemen-elemen (disebut Node). Setiap Node menyimpan 2 komponen: data utama dan pointer/referensi ke Node berikutnya di memori.\n\nContoh Kode Linked List di Python:\n```python\nclass Node:\n    def __init__(self, data):\n        self.data = data\n        self.next = None\n\nclass LinkedList:\n    def __init__(self):\n        self.head = None\n\n    def append(self, data):\n        new_node = Node(data)\n        if not self.head:\n            self.head = new_node\n            return\n        curr = self.head\n        while curr.next:\n            curr = curr.next\n        curr.next = new_node\n\n# Penggunaan:\nlist_data = LinkedList()\nlist_data.append('Node Pertama')\nlist_data.append('Node Kedua')\nprint(list_data.head.data) # Output: Node Pertama\n```\n\nKeunggulannya: Alokasi memori dinamis dan penambahan data di awal sangat cepat (O(1))!";
        } else if (str_contains($lowerMsg, 'array') || str_contains($lowerMsg, 'larik')) {
            $reply = "Array adalah struktur data yang menyimpan elemen bertipe data sama secara berurutan di lokasi memori yang berdampingan.\n\nContoh di Python:\n```python\nangka = [10, 20, 30, 40, 50]\nprint(angka[0]) # Akses instan O(1) -> 10\nangka.append(60)\nprint(angka)\n```";
        } else if (str_contains($lowerMsg, 'stack') || str_contains($lowerMsg, 'tumpukan')) {
            $reply = "Stack (Tumpukan) menganut prinsip LIFO (Last In First Out) — elemen terakhir yang dimasukkan akan pertama kali dikeluarkan.\n\nContoh di Python:\n```python\nstack = []\nstack.append('A') # Push\nstack.append('B')\nprint(stack.pop()) # Pop -> 'B'\n```";
        } else if (str_contains($lowerMsg, 'queue') || str_contains($lowerMsg, 'antrian')) {
            $reply = "Queue (Antrian) menganut prinsip FIFO (First In First Out) — elemen pertama yang dimasukkan akan pertama kali dikeluarkan.\n\nContoh di Python:\n```python\nfrom collections import deque\nq = deque()\nq.append('User 1')\nq.append('User 2')\nprint(q.popleft()) # Output -> 'User 1'\n```";
        } else if (str_contains($lowerMsg, 'oop') || str_contains($lowerMsg, 'object oriented') || str_contains($lowerMsg, 'objek')) {
            $reply = "OOP (Object-Oriented Programming) adalah paradigma noding berbasis Objek & Class dengan 4 pilar utama:\n1. Encapsulation (Pembungkusan data)\n2. Inheritance (Pewarisan sifat class)\n3. Polymorphism (Metode fleksibel)\n4. Abstraction (Penyembunyian kompleksitas)\n\nContoh di Python:\n```python\nclass Developer:\n    def __init__(self, nama):\n        self.nama = nama\n    def ngoding(self):\n        return f'{self.nama} sedang membuat aplikasi Web!'\n\ndev = Developer('Zaki')\nprint(dev.ngoding())\n```";
        } else if (str_contains($lowerMsg, 'python') || str_contains($lowerMsg, 'pyhton')) {
            $reply = "Python adalah bahasa pemrograman serbaguna dan bersih yang sangat disukai untuk Web Dev, Automation, & AI.\n\nContoh Kode Python Sederhana:\n```python\ndef hitung_diskon(harga, persen):\n    return harga - (harga * (persen / 100))\n\nharga_akhir = hitung_diskon(150000, 20)\nprint(f'Harga Bayar: Rp{harga_akhir:,}')\n```\n\nKamu butuh bantuan koding Python untuk studi kasus spesifik apa? Tanyakan saja!";
        } else if (str_contains($lowerMsg, 'javascript') || str_contains($lowerMsg, 'js') || str_contains($lowerMsg, 'react') || str_contains($lowerMsg, 'typescript')) {
            $reply = "JavaScript & TypeScript adalah fondasi utama pengembangan web modern interaktif! Zaki & Naoo Helper sangat ahli dalam React, Node.js, & TypeScript.\n\nContoh Component React (TypeScript):\n```tsx\nexport function UserBadge({ name }: { name: string }) {\n  return (\n    <div className='p-3 bg-cyan-500 text-white font-bold shadow'>\n      <p>Developer: {name}</p>\n    </div>\n  );\n}\n```";
        } else if (str_contains($lowerMsg, 'php') || str_contains($lowerMsg, 'laravel')) {
            $reply = "PHP & Laravel 12 adalah framework backend bertenaga tinggi yang digunakan pada portfolio ini!\n\nContoh Response Controller Laravel:\n```php\npublic function getProjects() {\n    return response()->json([\n        'status' => 'success',\n        'data' => Project::latest()->get()\n    ]);\n}\n```";
        } else if (str_contains($lowerMsg, 'sql') || str_contains($lowerMsg, 'database') || str_contains($lowerMsg, 'db')) {
            $reply = "SQL digunakan untuk mengelola data di RDBMS seperti MySQL atau SQLite. Contoh query SQL:\n```sql\nSELECT users.id, users.name, user_chats.message \nFROM users \nJOIN user_chats ON users.id = user_chats.sender_id \nWHERE users.role = 'admin';\n```";
        } else if (str_contains($lowerMsg, 'noding') || str_contains($lowerMsg, 'koding') || str_contains($lowerMsg, 'coding') || str_contains($lowerMsg, 'pemrograman') || str_contains($lowerMsg, 'bisa noding')) {
            $reply = "Bisa banget! Aku Naoo Helper dan Zaki menguasai Full Stack Web Development & Software Engineering (Python, JavaScript, TypeScript, PHP, React, Laravel, Node.js, SQL, Struktur Data). Mau bantuan noding program atau materi apa?";
        } else if (str_contains($lowerMsg, 'proyek') || str_contains($lowerMsg, 'project') || str_contains($lowerMsg, 'portofolio')) {
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
            $reply = "Halo! Aku Naoo Helper. Ada yang bisa aku bantu seputar koding, proyek, atau materi noding Zaki?";
        } else {
            $reply = "Aku Naoo Helper! Aku bisa bantu jelaskan materi koding (Linked List, Array, Stack, OOP), buatkan program Python, JavaScript, PHP, React, atau info proyek & keahlian Zaki. Silakan tanya ya!";
        }

        return response()->json(['reply' => $reply]);
    }
}
