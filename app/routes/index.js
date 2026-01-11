// TODO: Definisikan semua jalur (Route) aplikasi kalian disini (GET, POST, PUT, DELETE)
const express = require('express');
const router = express.Router();
const db = require('../config/database');

// --- 1. READ (Menampilkan Lowongan) [cite: 69] ---
router.get('/', (req, res) => {
    // Join tabel jobs dengan categories untuk menampilkan nama kategori
    const sql = `
        SELECT jobs.*, categories.category_name 
        FROM jobs 
        LEFT JOIN categories ON jobs.category_id = categories.id 
        ORDER BY jobs.id DESC
    `;
    
    // Query kedua untuk mengambil list kategori (untuk dropdown form tambah)
    const sqlCategories = 'SELECT * FROM categories';

    db.query(sql, (err, jobs) => {
        if (err) throw err;
        db.query(sqlCategories, (err, categories) => {
            if (err) throw err;
            res.render('index', { jobs, categories });
        });
    });
});

// --- 2. CREATE (Menambah Lowongan) [cite: 67] ---
router.post('/jobs/add', (req, res) => {
    const { title, description, requirement, deadline, category_id } = req.body;
    
    const sql = `INSERT INTO jobs (title, description, requirement, deadline, category_id, status) 
                 VALUES (?, ?, ?, ?, ?, 'Open')`;
                 
    db.query(sql, [title, description, requirement, deadline, category_id], (err, result) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Gagal menambah data');
        }
        res.redirect('/');
    });
});

// --- 3. DELETE (Menghapus Lowongan) [cite: 73] ---
router.get('/jobs/delete/:id', (req, res) => {
    const sql = 'DELETE FROM jobs WHERE id = ?';
    db.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

// --- 4. UPDATE (Edit Lowongan - Persiapan Halaman) [cite: 71] ---
router.get('/jobs/edit/:id', (req, res) => {
    const sqlJob = 'SELECT * FROM jobs WHERE id = ?';
    const sqlCategories = 'SELECT * FROM categories';

    db.query(sqlJob, [req.params.id], (err, result) => {
        if (err) throw err;
        if (result.length === 0) return res.redirect('/');
        
        db.query(sqlCategories, (err, categories) => {
            // Render halaman edit (perlu buat file edit.ejs nanti di frontend)
            // Atau bisa pakai modal di index.ejs
            res.render('edit', { job: result[0], categories });
        });
    });
});

// --- 5. UPDATE (Proses Simpan Edit) [cite: 71] ---
router.post('/jobs/update/:id', (req, res) => {
    const { title, description, requirement, deadline, category_id, status } = req.body;
    const sql = `UPDATE jobs SET title=?, description=?, requirement=?, deadline=?, category_id=?, status=? 
                 WHERE id=?`;

    db.query(sql, [title, description, requirement, deadline, category_id, status, req.params.id], (err, result) => {
        if (err) throw err;
        res.redirect('/');
    });
});

module.exports = router;