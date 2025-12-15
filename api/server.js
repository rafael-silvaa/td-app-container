const express = require('express');
const { Pool } = require('pg');

const app = express();

const PORT = process.env.API_PORT || 3000;

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.get('/status', (req, res) => {
    res.json({ status: 'OK', message: 'API is running'});
});

app.get('/items', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM items');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({error: 'Database error'});
    }
});

// handle shutdown
const server = app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});

process.on('SIGTERM', async () => {
    console.log('SIGTERM received, shutting down...');
    await pool.end();
    server.close(() => {
        console.log('Process terminated');
    });
});