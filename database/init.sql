-- TODO: Tulis query SQL kalian di sini (CREATE TABLE & INSERT) untuk inisialisasi database otomatis
CREATE DATABASE IF NOT EXISTS hustlink_db;
USE hustlink_db;

-- Tabel Users
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL, -- Ingat di-hash nanti di backend
    email VARCHAR(255) NOT NULL,
    alamat TEXT,
    role ENUM('admin', 'user') DEFAULT 'user'
);

-- Tabel Kategori
CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(100) NOT NULL
);

-- Tabel Jobs (Lowongan)
CREATE TABLE IF NOT EXISTS jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    requirement TEXT,
    deadline DATE,
    status VARCHAR(50) DEFAULT 'Open',
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

-- Tabel Applicant
-- Catatan: PDF menyebutkan kolom id_kategori, namun logikanya pelamar melamar ke 'jobs'.
-- Kode di bawah mengikuti request PDF kolomnya, tapi disarankan tambahkan job_id agar fungsional.
CREATE TABLE IF NOT EXISTS applicants (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    category_id INT, -- Sesuai request PDF [cite: 91]
    date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

-- Dummy Data (Opsional tapi disarankan [cite: 45])
INSERT INTO categories (category_name) VALUES ('IT'), ('Marketing'), ('Finance');