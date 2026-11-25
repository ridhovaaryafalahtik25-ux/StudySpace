# Requirement Analysis - Study Space

## 1. Gambaran Umum
StudySpace adalah website berbasis front-end untuk membantu pelajar dan mahasiswa mengakses panduan belajar, membaca artikel, sumber belajar, mengatur jadwal, dan mengelola waktu fokus.

## 2. Target Pengguna
- Pelajar SMP/SMA/Sederajat.
- Mahasiswa/i.
- Pengguna yang ingin mengatur jadwal dan waktu belajar.

## 3. Struktur Halaman
1. **Beranda:** menampilkan nama pengguna, streak, statistik fokus, sesi Pomodoro, ringkasan jadwal, target harian, grafik fokus mingguan, dan aktivitas terbaru.
2. **Panduan Belajar:** menampilkan catatan kosong, waktu belajar, persiapan ujian, motivasi, fokus dan konsentrasi, dan mulai belajar.
3. **Artikel:** menampilkan kumpulan kartu artikel, dan detail artikel.
4. **Sumber Belajar:** menampilkan daftar sumber dengan kategori Artikel, Kursus, dan Jurnal.
5. **Calendar Planner:** menampilkan jadwal mingguan, tab penambahan kegiatan, status selesai, dan riwayat.
6. **Timer:** menyediakan mode Pomodoro, istirahat pendek, istirahat panjang, dan kontrol start/pause/reset.
7. **Pengaturan:** mengelola nama tampilan, preferensi, dan proses keluar.
8. **Tentang Kami:** menampilkan informasi mengenai proyek dan tim, pengenalan Study Space, dan SDG.
9. **Login:** menyediakan form masuk simulasi pada sisi front-end.

## 4. Kebutuhan Fungsional
- KF-01: Pengguna dapat berpindah ke halaman yang tersedia melalui navigasi.
- KF-02: Beranda menampilkan informasi profil dan ringkasan aktivitas belajar.
- KF-03: Halaman Panduan Belajar menampilkan kartu-kartu panduan.
- KF-04: Kartu panduan dapat membuka halaman Artikel sesuai tautan yang ditentukan.
- KF-05: Halaman Sumber Belajar menampilkan kategori Artikel, Kursus, dan Jurnal.
- KF-06: Calendar Planner menampilkan jadwal mingguan.
- KF-07: Pengguna dapat menambah kegiatan dengan informasi hari, waktu, dan warna.
- KF-08: Pengguna dapat menandai kegiatan selesai, melihat riwayat, mengembalikan, dan menghapus kegiatan.
- KF-09: Timer menyediakan tiga mode, yaitu Pomodoro, istirahat pendek, dan istirahat panjang.
- KF-10: Timer menyediakan kontrol mulai, jeda/lanjut, reset, dan pengaturan durasi.
- KF-11: Pengaturan memungkinkan pengguna mengubah nama tampilan dan preferensi yang tersedia.
- KF-12: Pengguna dapat keluar dari sesi simulasi.
- KF-13: Data tertentu disimpan pada `localStorage`.

## 5. Kebutuhan Nonfungsional
- KN-01: Website dapat diakses melalui browser desktop maupun perangkat mobile.
- KN-02: Tampilan dan navigasi konsisten di seluruh halaman.
- KN-03: Website dibangun menggunakan HTML, CSS, dan JavaScript.
- KN-04: Website tidak memerlukan instalasi aplikasi tambahan.
- KN-05: Interaksi dasar dapat digunakan melalui perangkat dengan ukuran layar berbeda.

## 6. Penyimpanan dan Batasan
- Data aplikasi disimpan pada `localStorage` browser.
- Data tidak tersinkronisasi antarperangkat.
- Website belum menggunakan database.
- Login merupakan simulasi front-end, bukan autentikasi akun sungguhan.
- Preferensi yang tersedia belum tentu terhubung ke layanan notifikasi atau privasi eksternal.
- Konten panduan, artikel, dan sumber belajar perlu ditinjau sebelum menjadi materi final.

## 7. Di Luar Cakupan
- To-Do List dan Study Notes sebagai fitur mandiri.
- Sinkronisasi data lintas perangkat.
- Autentikasi dan pengelolaan akun berbasis server.
