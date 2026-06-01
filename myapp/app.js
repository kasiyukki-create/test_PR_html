require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// GET メッセージ取得
app.get('/api/messages', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM messages ORDER BY created_at ASC');
    res.json(result.rows);
  } catch (e) {
    res.json([]);
  }
});

// POST メッセージ送信 ← ここが大事！
app.post('/api/messages', async (req, res) => {
  try {
    const { username = '名無し', text } = req.body;   // ← これを正しく書く

    if (!text) {
      return res.status(400).json({ error: "メッセージを入力してください" });
    }

    const result = await pool.query(
      'INSERT INTO messages (username, text) VALUES ($1, $2) RETURNING *',
      [username, text]
    );
    res.json(result.rows[0]);
  } catch (e) {
    console.error(e);
    res.json({ 
      id: Date.now(), 
      username: '名無し', 
      text: req.body?.text || 'エラーが発生しました' 
    });
  }
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/chat.html');
});


app.listen(process.env.PORT || 3000, () => {
  console.log(
    `サーバーが起動しました: http://localhost:${process.env.PORT || 3000}`);
});