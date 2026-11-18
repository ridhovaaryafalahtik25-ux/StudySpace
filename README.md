# StudySpace

**Website Panduan Belajar Efektif untuk Pelajar dan Mahasiswa**

> *"Belajar Lebih Terarah, Raih Hasil Lebih Baik."*

**Tema SDGs:** SDG 4 – Pendidikan Berkualitas (Quality Education)

| | |
|---|---|
| 🌐 **Website** | `<url-website-github-pages>` |
| 🗺️ **Sitemap** | `<url-website-github-pages>/sitemap.xml` |
| 📁 **Repositori** | `<url-repositori>` |

---

## Deskripsi

StudySpace adalah website yang menyediakan informasi sekaligus alat bantu belajar dalam satu platform. Pelajar dan mahasiswa sering kesulitan mengatur waktu belajar, menjaga fokus, mengelola tugas, dan mencatat materi, sementara alat bantunya tersebar di banyak aplikasi. StudySpace menggabungkan panduan belajar, kalender jadwal, timer Pomodoro, To-Do List, dan catatan belajar di satu tempat.

## Tujuan Pembuatan Website

- Memberikan informasi mengenai metode dan teknik belajar yang efektif.
- Membantu pengguna menyusun jadwal belajar melalui **Study Planner**.
- Membantu pengguna menjaga konsentrasi melalui **Pomodoro Timer**.
- Memudahkan pengguna mencatat tugas, target, dan materi melalui **To-Do List & Study Notes**.
- Mendukung SDG 4 melalui penyediaan informasi dan fasilitas belajar yang mudah diakses.

## Target Pengguna

| Pengguna | Kebutuhan |
|---|---|
| Pelajar SMP/SMA | Membangun kebiasaan belajar dan mengatur jadwal akademik |
| Mahasiswa | Mengelola waktu kuliah, tugas, dan persiapan ujian |
| Pengguna umum | Meningkatkan produktivitas dan menerapkan metode belajar efektif |

## Fitur

### Halaman
| Halaman | Isi |
|---|---|
| **Beranda (Homepage)** | Hero section (nama, deskripsi, slogan, ilustrasi, tombol "Mulai Belajar"), ringkasan Study Guide, dan ringkasan Study Tips |
| **Panduan Belajar (Study Guide)** | Metode Pomodoro, Cornell Notes, Active Recall, Spaced Repetition; kategori Manajemen Waktu, Metode Belajar, Teknik Mencatat, Persiapan Ujian |
| **Tips Belajar (Study Tips)** | Tiga fitur interaktif (lihat di bawah) |
| **Tentang Kami (About Us)** | Latar belakang, tujuan, kaitan dengan SDG 4, dan profil kelompok |
| **Profile & Settings** | Tersedia pada sidebar navigasi |

### Fitur Interaktif (Tips Belajar)
1. **Study Planner** – kalender untuk memilih tanggal, menambah, melihat, dan menghapus jadwal belajar.
2. **Pomodoro Timer** – jalankan, jeda, ulang timer; durasi fokus dan istirahat dapat diatur.
3. **To-Do List & Study Notes** – tambah, centang, dan hapus tugas beserta progres penyelesaian; buat, simpan, buka, dan hapus catatan.

## Alur Sistem

### Alur Sistem Utama
1. Pengguna membuka website.
2. Sistem menampilkan halaman login.
3. Pengguna melakukan login.
4. Sistem menampilkan halaman Beranda.
5. Pengguna melihat pengenalan StudySpace, panduan belajar, dan tips belajar.
6. Pengguna memilih halaman atau informasi yang ingin diakses.
7. Sistem mengarahkan pengguna ke halaman yang sesuai.
8. Pengguna membaca informasi pada halaman tersebut.
9. Pengguna dapat berpindah ke halaman lain melalui navigasi utama.
10. Pengguna mengakhiri aktivitas dengan meninggalkan website.

### Alur Halaman

#### Login
1. Pengguna membuka website StudySpace.
2. Sistem menampilkan halaman login.
3. Pengguna memasukkan email dan password, atau menggunakan akun Google.
4. Pengguna menekan tombol **Login**.
5. Sistem memeriksa apakah seluruh kolom sudah diisi.
6. Jika ada kolom kosong, sistem menampilkan pesan bahwa email dan password wajib diisi.
7. Jika semua kolom terisi, sistem memvalidasi format email.
8. Sistem mencocokkan email dan password dengan data akun yang tersimpan.
9. Sistem memeriksa kesesuaian data akun.
10. Jika salah, sistem menampilkan pesan **"Email atau password tidak sesuai"**.
11. Jika benar, sistem membuat sesi login pengguna.
12. Sistem mengarahkan pengguna ke halaman Beranda.
13. Pengguna dapat mengakses fitur website sesuai status login.
14. Jika lupa password, pengguna menekan **Forgot password**.
15. Sistem mengarahkan pengguna ke halaman Forgot Password.
16. Jika belum punya akun, pengguna menekan **Sign up**.
17. Sistem mengarahkan pengguna ke halaman Sign Up.

#### Beranda
1. Pengguna berhasil login/sign up.
2. Sistem menampilkan Homepage dengan sidebar navigasi: Homepage, Study Guide, Study Tips, About Us, Profile, Settings.
3. Sistem menampilkan Hero Section: nama StudySpace, deskripsi singkat, slogan, gambar ilustrasi, dan tombol **Mulai Belajar**.
4. Pengguna menekan **Mulai Belajar**.
5. Sistem mengarahkan pengguna ke halaman lengkap Study Guide.
6. Jika pengguna menggulir ke bawah, sistem menampilkan bagian Study Guide.
7. Sistem menampilkan empat kategori panduan: Manajemen Waktu, Metode Belajar, Teknik Mencatat, Persiapan Ujian.
8. Pengguna dapat memilih salah satu kategori untuk membaca panduan lebih lanjut.
9. Pengguna dapat memilih **Lihat Semua** untuk membuka halaman Study Guide.
10. Sistem menampilkan bagian Study Tips: Atur Jadwal Belajar, Gunakan Metode Pomodoro, Jaga Kesehatan.
11. Pengguna dapat memilih **Lihat Semua** untuk membuka halaman Study Tips.
12. Pengguna dapat memilih menu navigasi lain untuk berpindah halaman.

## Analisis 5W1H

Ringkasan analisis 5W1H StudySpace. Rincian data dan daftar pustaka lengkap ada di [`requirements.md`](requirements.md).

| Unsur | Penjelasan | Data pendukung (sumber) |
|---|---|---|
| **What** (Apa) | Website statis yang menggabungkan panduan metode belajar dengan Study Planner, Pomodoro Timer, To-Do List, dan Study Notes. | 273 juta anak dan pemuda di dunia tidak bersekolah pada 2024 ([UN SDG Report 2026](https://unstats.un.org/sdgs/report/2026/goal-04/)). |
| **Why** (Mengapa) | Kualitas pembelajaran masih rendah dan banyak pelajar belum memakai teknik belajar yang terbukti efektif. | Skor PISA Indonesia turun pada 2022: membaca 371 ke 359, matematika 379 ke 366, sains 396 ke 383 ([Tempo](https://www.asia-pacific-solidarity.net/news/2023-12-08/education-ministry-talks-of-drop-indonesias-pisa-2022-score.html)). Hanya sekitar 25% siswa Indonesia mencapai Level 2 membaca, rata-rata OECD 74% ([OECD](https://www.oecd.org/en/publications/pisa-2022-results-volume-i-and-ii-country-notes_ed6fbcc5-en/indonesia_c2e1ae0e-en.html)). *Practice testing* dan *distributed practice* paling efektif, sedangkan merangkum dan membaca ulang bernilai rendah ([Dunlosky dkk., 2013](https://doi.org/10.1177/1529100612453266)). |
| **Who** (Siapa) | Pelajar SMP/SMA, mahasiswa, dan pengguna umum. | Penetrasi internet Indonesia 80,66% pada 2025 ([detikInet](https://inet.detik.com/telecommunication/d-8047759/survei-apjii-pengguna-internet-indonesia-2025-tembus-229-juta-jiwa)); Gen Z 87,80% ([Fortune Indonesia](https://www.fortuneidn.com/tech/pengguna-internet-ri-tembus-80-persen-media-sosial-jadi-alasan-utama-00-6cmtl-rzv471)). |
| **Where** (Di mana) | Melalui browser di desktop dan mobile, tanpa instalasi; data tersimpan di localStorage perangkat pengguna. | 83,39% pengguna internet Indonesia memakai smartphone ([Gizmologi](https://gizmologi.id/insight/survei-internet-indonesia-2025/amp/)). Sekitar 55 juta orang belum terhubung internet, ini menjadi keterbatasan ([Suara.com](https://www.suara.com/tekno/2025/08/06/190354/riset-apjii-55-juta-orang-indonesia-belum-dapat-akses-internet-di-2025)). |
| **When** (Kapan) | Dapat dipakai kapan saja untuk jadwal harian, sesi belajar, dan persiapan ujian. | Target SDG 4 jatuh tempo 2030 dan kemajuannya dinilai masih jauh dari jalur ([SDG Action](https://sdg-action.org/sdgs/4-quality-education/)). Belajar yang disebar dalam beberapa sesi lebih efektif daripada menumpuk ([APS](https://www.psychologicalscience.org/news/releases/which-study-strategies-make-the-grade.html)). |
| **How** (Bagaimana) | Dibangun dengan HTML, CSS, dan JavaScript tanpa database dan login; Study Planner dan panduan Active Recall serta Spaced Repetition mengacu pada teknik berbukti tinggi. | Dunlosky dkk. (2013), lihat baris Why. Pomodoro, To-Do, dan Study Notes ditampilkan sebagai alat bantu praktis, belum ada sumber penelitian khusus. |

## Teknologi yang Digunakan

- **HTML** – struktur halaman
- **CSS** – tata letak, komponen, dan responsivitas

## Kebutuhan Nonfungsional

- Responsif tanpa scroll horizontal pada lebar layar 360 px dan 1024 px.
- Desain sederhana, konsisten, dan mudah dipahami.
- Navigasi, tombol, dan tautan utama dapat diakses dengan keyboard dan memiliki indikator fokus yang terlihat.
- Dapat digunakan langsung melalui browser tanpa mengunduh aplikasi tambahan.

## Batasan Sistem

- Website statis berbasis HTML, CSS, dan JavaScript.
- Data pengguna tersimpan di localStorage, sehingga hanya tersedia pada browser dan perangkat yang sama.
- Study Planner hanya untuk jadwal sederhana dan tidak tersinkronisasi dengan aplikasi lain.
- Pomodoro Timer tidak berjalan saat browser ditutup.
- Materi bersifat informasi edukatif; identitas tim dan kontak dapat berupa data simulasi.

## Struktur Folder

```
StudySpace/
├── index.html
├── css/
│   └── style.css
├── assets/
│   └── images/
├── sitemap.xml
├── README.md
├── CHANGELOG.md
└── docs/
    ├── site-structure.md (coming soon)
    ├── requirements.md
    ├── testing.md
    └── wireframe-mockup/ (coming soon)
```

## Cara Menjalankan

1. Unduh atau clone repositori ini.
   ```bash
   git clone <url-repositori>
   cd StudySpace
   ```
2. Buka file `index.html` langsung di browser (Chrome, Firefox, Edge, atau Safari).
3. Alternatif: jalankan dengan Live Server di VS Code agar perubahan langsung terlihat.

Tidak diperlukan instalasi tambahan.

## Pembagian Tugas Kelompok

| Anggota | Peran | Fokus | Hasil Utama |
|---|---|---|---|
| Ridhova Arya Falah | Ketua dan Koordinator | Jadwal, konfirmasi data, dokumentasi proyek | `README.md` |
| Naailah Risqullah | Analis dan Pengelola Konten | Kebutuhan, teks, pemeriksaan informasi | `requirements.md` |
| Aykho Praysila Zai | Perancang dan Pengembang HTML | Peta konten, wireframe, struktur halaman | `index.html` |
| Kaylin Patricia | Pengembang CSS (Tata Letak) | Tampilan dan responsivitas | `css/style.css` |
| Putri Anisa La Ananila | Pengembang CSS (Komponen) dan Aset | Tombol, tabel, fokus keyboard, gambar | `css/style.css`, `assets/images/` |
| Dean M Wahyudan | Penguji dan Dokumentator | Pengujian, bukti, riwayat perubahan | `testing.md`, `CHANGELOG.md` |

## Dokumentasi Perancangan

Dokumen perancangan awal disimpan di repositori ini:

| Dokumen | Lokasi |
|---|---|
| Rancangan Kebutuhan (Requirement Analysis, termasuk 5W1H dan data pendukung) | [`requirements.md`](requirements.md) |
| Site Structure (struktur navigasi dan flowchart) | [`docs/site-structure.md`](docs/site-structure.md) |
| Wireframe dan Mockup | [`docs/wireframe-mockup/`](docs/wireframe-mockup/) |

## Dokumentasi Pendukung

- [`requirements.md`](requirements.md) – kebutuhan fungsional, nonfungsional, dan 5W1H
- [`testing.md`](testing.md) – hasil pengujian website
- [`CHANGELOG.md`](CHANGELOG.md) – riwayat perubahan

## Alur Kontribusi

- Semua anggota ditambahkan sebagai **Collaborator** di repositori (Settings → Collaborators), dan setiap anggota melakukan commit dengan akun GitHub masing-masing agar tampil di daftar **Contributors**.
- Pengembangan dilakukan bertahap. Setiap fitur yang sudah jadi langsung di-*commit* dan di-*push*, bukan diunggah sekaligus di akhir.
- Contoh pesan commit: `feat: tambah Pomodoro Timer`, `fix: perbaiki scroll horizontal di 360 px`, `docs: lengkapi requirements.md`.

## Kaitan dengan SDG 4

StudySpace mendukung **SDG 4: Pendidikan Berkualitas** dengan menyediakan panduan dan alat bantu belajar yang gratis, mudah diakses lewat browser, dan tidak memerlukan aplikasi tambahan.

---

*Dibuat oleh kelompok StudySpace.*
