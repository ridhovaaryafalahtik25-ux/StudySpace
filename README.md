# StudySpace

**Website Panduan Belajar Efektif untuk Pelajar dan Mahasiswa**

> *Belajar Lebih Terarah, Raih Hasil Lebih Baik.*

**Tema proyek:** SDG 4 – Pendidikan Berkualitas (*Quality Education*)

## Deskripsi

StudySpace merupakan website pendamping belajar untuk membantu pelajar dan mahasiswa mengelola kegiatan belajar dalam satu tempat. Website ini menyediakan dashboard progres belajar, timer fokus, planner mingguan, panduan belajar, serta halaman artikel dan sumber belajar.

Proyek dibuat menggunakan HTML, CSS, dan JavaScript. Data akun demo, pengaturan, statistik, serta jadwal disimpan secara lokal di browser menggunakan `localStorage`. Website belum menggunakan database maupun layanan autentikasi.

## Latar Belakang

**Pendidikan berkualitas sebagai tujuan global.** SDG 4 bertujuan memastikan pendidikan yang inklusif dan berkualitas serta mendorong kesempatan belajar sepanjang hayat untuk semua orang. PBB menilai Tujuan 4 sebagai pendorong penting pembangunan berkelanjutan, tetapi kemajuannya masih di bawah target [1][2]. Pada 2019, hanya 58% siswa di dunia yang mencapai kemampuan membaca minimum di akhir sekolah dasar. Selain itu, antara 2018 dan 2022 rata-rata nilai matematika di 81 negara OECD dan mitra turun 15 poin, sedangkan nilai membaca turun 10 poin [1].

**Kondisi di Indonesia.** Hasil PISA 2022 Indonesia termasuk yang terendah yang pernah tercatat di tiga bidang yang diuji, setara capaian tahun 2003 untuk membaca dan matematika serta 2006 untuk sains [3]. Hasil PISA 2025 relatif sama dengan 2022 dan masih di bawah capaian 2015. Hanya 37% siswa Indonesia mencapai Level 2 atau lebih di sains, sedangkan rata-rata OECD adalah 74% [4].

**Kebiasaan belajar menentukan hasil.** Perbaikan pendidikan membutuhkan upaya di banyak sisi, dan salah satunya adalah membantu siswa mengatur cara belajarnya sendiri. Tinjauan Dunlosky dkk. (2013) terhadap 10 teknik belajar menilai *practice testing* dan *distributed practice* sebagai teknik dengan manfaat tinggi karena efektif untuk berbagai usia, kemampuan, dan jenis tugas. Sebaliknya, merangkum, menandai teks, dan membaca ulang dinilai kurang bermanfaat meskipun paling sering digunakan siswa [5]. Dua teknik yang efektif tersebut sejalan dengan *Active Recall* dan *Spaced Repetition* yang dibahas pada halaman Sumber Belajar StudySpace.

**Pengaturan waktu dan istirahat.** Teknik Pomodoro membagi belajar menjadi blok 25 menit dengan istirahat 5 menit, dan setelah empat blok diberikan istirahat lebih panjang selama 15–30 menit [7]. Bukti ilmiahnya masih beragam. Studi pada 87 mahasiswa di Belanda menemukan bahwa istirahat terjadwal memberi manfaat pada suasana hati dan tampak lebih efisien dibanding istirahat yang diatur sendiri [6]. Studi lain justru menemukan istirahat Pomodoro membuat kelelahan naik dan motivasi turun lebih cepat, walaupun hasil akhirnya tidak berbeda [7]. Karena itu, StudySpace menyediakan pengaturan durasi timer agar pengguna dapat menyesuaikan pola belajarnya.

## Tujuan

- Menyediakan panduan dan informasi mengenai kegiatan belajar.
- Membantu pengguna mengatur jadwal belajar mingguan.
- Membantu pengguna menjaga fokus menggunakan timer Pomodoro.
- Menampilkan ringkasan progres dan aktivitas belajar.
- Menyediakan akses ke artikel dan sumber belajar dalam satu website.

## Target Pengguna

- Pelajar SMP dan SMA.
- Mahasiswa.
- Pengguna yang ingin membangun kebiasaan belajar lebih teratur.

## Halaman dan Fitur

| Halaman | File | Isi dan fungsi |
|---|---|---|
| Masuk | `login.html` | Form email dan kata sandi untuk masuk ke versi demo. Nama pengguna demo dibuat dari bagian email sebelum tanda `@`. |
| Beranda | `index.html` | Dashboard yang menampilkan sapaan pengguna, jumlah hari streak, fokus hari ini, sesi Pomodoro, tugas selesai, rekor streak, grafik fokus mingguan, target harian, dan aktivitas terbaru. |
| Timer | `timer.html` | Timer dengan mode Pomodoro, istirahat pendek, dan istirahat panjang. Pengguna dapat memulai, menjeda, melanjutkan, mengatur ulang, serta mengubah durasi setiap mode. Sesi Pomodoro yang selesai dicatat ke statistik belajar. |
| Calendar Planner | `planner.html` | Jadwal mingguan Senin–Minggu dalam bentuk timeline. Pengguna dapat menambahkan kegiatan, menentukan jam dan kategori warna, menandai jadwal selesai, melihat riwayat, mengembalikan jadwal, dan menghapus jadwal. Sistem memberi pemberitahuan jika jadwal yang ditambahkan bertabrakan. |
| Panduan Belajar | `panduan.html` | Halaman berisi 6 panduan belajar (Mulai Belajar, Mengatur Waktu, Membuat Catatan, Persiapan Ujian, Fokus dan Konsentrasi, Menjaga Motivasi). Kartu panduan dibuat melalui JavaScript. |
| Artikel | `artikel.html` | Halaman detail artikel yang dibuka dari kartu kategori Artikel di halaman Sumber Belajar (`artikel.html?id=…`). Saat ini menampilkan judul dan ringkasan artikel. |
| Sumber Belajar | `sumber.html` | Daftar 8 sumber (4 artikel, 3 kursus, 1 jurnal) dengan filter kategori Semua, Artikel, Kursus, dan Jurnal. Kartu Artikel membuka halaman detail; kartu Kursus dan Jurnal belum mengarah ke sumber eksternal. |
| Pengaturan | `pengaturan.html` | Pengaturan nama tampilan, preferensi privasi, preferensi notifikasi, logout, dan tautan ke halaman Tentang Kami. |
| Tentang Kami | `tentang.html` | Informasi pengenalan StudySpace dan tim. **Catatan:** bagian SDG pada halaman ini saat ini masih menyebut SDG 12, sedangkan tema proyek yang ditetapkan adalah SDG 4. Bagian tersebut perlu diselaraskan. |

## Penyimpanan Data

Website menggunakan `localStorage` pada browser, tanpa database. Beberapa data yang disimpan antara lain:

| Data | Key `localStorage` | Keterangan |
|---|---|---|
| Nama pengguna demo | `ss_user` | Digunakan untuk menampilkan nama dan mengatur akses halaman demo. |
| Statistik belajar | `studyspace_stats` | Menyimpan streak, menit fokus, sesi Pomodoro, tugas selesai, riwayat fokus, dan aktivitas terbaru. |
| Jadwal planner | `ss_events` | Menyimpan jadwal mingguan beserta status penyelesaiannya. |
| Preferensi pengaturan | Key dengan awalan `ss_` | Menyimpan pilihan privasi dan notifikasi. |

Data hanya tersedia pada browser dan perangkat tempat data dibuat. Menghapus data situs/browser dapat menghapus data StudySpace.

## Teknologi

- **HTML5** untuk struktur halaman.
- **CSS3** untuk tampilan dan layout responsif.
- **JavaScript** untuk navigasi demo, timer, planner, statistik, filter sumber, dan pengaturan.
- **localStorage** untuk penyimpanan data di sisi browser.

## Struktur Folder

```text
StudySpace-main/
├── css/
│   └── style.css
├── docs/
│   ├── CHANGELOG.md
│   ├── requirements.md
│   ├── sitemap.md
│   └── testing.md
├── Images
├── js/
│   └── script.js
├── README.md
├── artikel.html
├── index.html
├── login.html
├── panduan.html
├── pengaturan.html
├── planner.html
├── sumber.html
├── tentang.html
└── timer.html
```

## Cara Menjalankan

1. Unduh atau clone repositori.
   ```bash
   git clone <url-repositori>
   cd StudySpace-main
   ```
2. Buka folder proyek menggunakan Visual Studio Code.
3. Jalankan `login.html` melalui browser atau gunakan ekstensi **Live Server**.
4. Masukkan email dan kata sandi pada form demo. Website menggunakan bagian awal email sebagai nama tampilan, lalu mengarahkan pengguna ke Beranda.

Tidak diperlukan instalasi package atau database.

## Batasan dan Catatan Pengembangan

- Login hanya simulasi di browser. Belum ada verifikasi kata sandi, registrasi akun, autentikasi Google/Facebook/Apple, maupun backend.
- Data pengguna dan aktivitas tersimpan di `localStorage`, sehingga tidak tersinkronisasi antarperangkat atau antarbrowser.
- Timer berjalan selama halaman timer terbuka. Timer tidak dijamin tetap berjalan ketika halaman atau browser ditutup.
- Planner menggunakan jadwal mingguan, bukan kalender bulanan berbasis tanggal.
- Halaman Artikel baru memuat judul dan ringkasan. Kartu Kursus dan Jurnal pada Sumber Belajar belum memiliki tautan ke sumber asli dan perlu dilengkapi dengan referensi yang valid.
- Sidebar pada `pengaturan.html` masih memiliki tautan ke `tips.html`, tetapi file tersebut belum tersedia di repositori ini. Tautan tersebut perlu diperbaiki atau halaman Tips Belajar perlu dibuat.
- Halaman `tentang.html` masih menampilkan SDG 12. Konten ini perlu diperbarui agar sesuai dengan tema proyek SDG 4.
- Preferensi notifikasi pada Pengaturan saat ini disimpan sebagai pilihan pengguna; belum terhubung dengan sistem pengingat atau notifikasi browser.

## Dokumentasi Proyek

- [Requirement Analysis](docs/requirements.md) – gambaran umum, target pengguna, kebutuhan fungsional, dan batasan.
- [Site Structure](docs/sitemap.md) – struktur navigasi dan flowchart yang tersedia saat ini. Dokumen ini masih perlu disesuaikan dengan struktur website terbaru.
- [Testing Checklist](docs/testing.md) – daftar pemeriksaan fitur dan tampilan.
- [Changelog](docs/CHANGELOG.md) – riwayat perubahan proyek.
- [Asset/Images](/images) – Kumpulan Dokumentasi dan Asset untuk kebutuhan proyek

## Tim Pengembang

- Ridhova Arya Falah
- Naailah Risqullah
- Aykho Praysila Zai
- Dean M Wahyudan
- Kaylin Patricia
- Putri Anisa La Ananila

## Kaitan dengan SDG 4

StudySpace dikembangkan dengan tema **SDG 4: Pendidikan Berkualitas**. Proyek ini tidak dimaksudkan menyelesaikan persoalan pendidikan secara nasional, tetapi menjadi alat bantu di tingkat individu. Melalui panduan belajar, timer Pomodoro, planner mingguan, serta artikel dan sumber belajar dalam satu platform, StudySpace diharapkan mendukung kebiasaan belajar mandiri yang lebih terarah dan akses informasi belajar yang lebih mudah, sejalan dengan semangat belajar sepanjang hayat pada SDG 4. Penyebutan SDG pada halaman Tentang Kami masih perlu diselaraskan dengan tema tersebut.
