const express = require('express');
const { Pool } = require('pg');
const app = express();

const port = process.env.PORT || 3000;
const pool = new Pool({
    user: process.env.db_user,
    host: process.env.db_host,
    database: process.env.db_name,
    password: process.env.db_password,
    port: process.env.db_port,
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
const server = app.listen(port, () => {
    console.log('API listening on port ${port}');
});

process.on('SIGTERM', () => {
    server.close(() => {
        console.log('Process terminated');
    });
});