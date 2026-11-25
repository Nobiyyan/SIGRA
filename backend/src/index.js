import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { pool } from './config/db.js';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', async (_req, res) => {
  try {
    const [rows] = await pool.query('SELECT 1 AS ok');
    res.json({ status: 'ok', db: rows[0].ok === 1 });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`SIGRA API jalan di port ${port}`));