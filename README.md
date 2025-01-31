# Sistem Manajemen Nilai Sekolah

Sistem manajemen nilai sekolah berbasis web menggunakan Laravel Breeze, React, dan PDF untuk mencetak nilai raport. Website ini memiliki beberapa jenis pengguna dengan fitur yang berbeda untuk masing-masing.

## Fitur

-   **Admin**:

    -   Mengolah data siswa, guru, kelas, ekstrakurikuler, semester, dan jurusan.
    -   Mengelola informasi terkait pengajaran dan administrasi sekolah.

-   **Wali Kelas**:

    -   Menginput nilai siswa.
    -   Menginput nilai absensi dan nilai ekstrakurikuler.
    -   Mencetak laporan nilai dalam bentuk PDF.

-   **Kepala Sekolah**:

    -   Memantau dan mengawasi proses penginputan nilai siswa oleh wali kelas.

-   **Siswa**:
    -   Melihat nilai raport mereka.
    -   Mencetak laporan nilai mereka dalam bentuk PDF.

## Prasyarat

-   PHP 8.0+
-   Composer
-   Node.js dan npm
-   MySQL atau database lain yang kompatibel dengan Laravel
-   Laravel 10.x
-   Laravel Breeze

## Instalasi

Ikuti langkah-langkah berikut untuk menginstal dan menjalankan proyek ini:

**1. Clone Repository**

Clone repository ini ke komputer Anda:

```bash
git clone https://github.com/username/project-name.git
cd project-name
```

**2. Install Dependencies Backend (Laravel)**

Instal dependensi PHP menggunakan Composer:

```bash
composer install
```

**3. Konfigurasi Environment**
Salin file .env.example menjadi .env:

```bash
cp .env.example .env
```

Setelah itu, buka file .env dan sesuaikan konfigurasi database dan pengaturan lainnya.

**4. Generate Key Aplikasi**
Generate key aplikasi Laravel:

```bash
php artisan key:generate
```

**5. Migrasi Database**
Jalankan migrasi untuk membuat tabel-tabel di database:

```bash
php artisan migrate
```

**6. Install Dependencies Frontend (React)**
Masuk ke direktori frontend dan instal dependensi menggunakan npm atau yarn:

```bash
npm install
```

Atau jika menggunakan Yarn:

```bash
yarn install
```

**7. Jalankan Proyek**
Untuk menjalankan proyek, buka dua terminal:

Di terminal pertama, jalankan server Laravel:

```bash
composer run dev
```

## Penggunaan

1. Admin: Admin dapat login melalui halaman login, lalu dapat mengakses fitur untuk mengolah data siswa, guru, kelas, ekstrakurikuler, semester, dan jurusan.
2. Wali Kelas: Wali kelas dapat login dan menginput nilai siswa serta nilai absensi dan ekstrakurikuler, serta mencetak laporan dalam format PDF.
3. Kepala Sekolah: Kepala sekolah dapat login dan memantau sejauh mana proses penginputan nilai oleh wali kelas.
4. Siswa: Siswa dapat login untuk melihat raport mereka dan mencetaknya dalam bentuk PDF.

## Teknologi yang Digunakan

-   Backend: Laravel, Laravel Breeze
-   Frontend: React, Tailwind CSS
-   Database: MySQL
-   Autentikasi: Laravel Breeze
-   PDF: Laravel domPDF
