require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');

const app = express();
app.use(express.json());
app.use(express.static('public'));

const pool = new Pool({
  host:     process.env.DB_HOST,
  port:     process.env.DB_PORT,
  database: process.env.DB_NAME,
  user:     process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

// GET /api/questions ── 質問と選択肢の一覧を返す
app.get('/api/questions', async (req, res) => {
  const questions = await pool.query('SELECT * FROM questions ORDER BY id');
  const result = [];
  for (const q of questions.rows) {
    const answers = await pool.query(
      'SELECT * FROM answers WHERE question_id = $1 ORDER BY id',
      [q.id]
    );
    result.push({ ...q, answers: answers.rows });
  }
  res.json(result);
});

// POST /api/votes/:id ── 指定した選択肢の vote_count を +1 する
app.post('/api/votes/:id', async (req, res) => {
  const { id } = req.params;
  const result = await pool.query(
    'UPDATE answers SET vote_count = vote_count + 1 WHERE id = $1 RETURNING *',
    [id]
  );
  res.json(result.rows[0]);
});

app.listen(3000, () => {
  console.log('サーバーが起動しました: http://localhost:3000');
});
### 4. vote.html を作成する

以下のコードをそのままコピーして `public/vote.html` として保存してください。

<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>投票アプリ</title>
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 40px auto; padding: 0 20px; }
    h1 { color: #333; }
    .question { background: #f5f5f5; border-radius: 8px; padding: 20px; margin: 20px 0; }
    h2 { margin-top: 0; }
    button {
      display: block; width: 100%; padding: 12px; margin: 8px 0;
      background: #0d7377; color: white;
      border: none; border-radius: 6px; font-size: 16px; cursor: pointer; text-align: left;
    }
    button:hover { background: #0a5f62; }
  </style>
</head>
<body>
  <h1>投票アプリ</h1>
  <div id="questions"></div>

  <script>
    async function loadQuestions() {
      const res = await fetch('/api/questions');
      const questions = await res.json();
      const container = document.getElementById('questions');
      container.innerHTML = '';
      for (const q of questions) {
        const section = document.createElement('div');
        section.className = 'question';
        section.innerHTML = `<h2>${q.question_text}</h2>`;
        for (const a of q.answers) {
          const btn = document.createElement('button');
          btn.textContent = `${a.answer_text}　（${a.vote_count}票）`;
          btn.onclick = () => vote(a.id);
          section.appendChild(btn);
        }
        container.appendChild(section);
      }
    }

    async function vote(answerId) {
      await fetch(`/api/votes/${answerId}`, { method: 'POST' });
      loadQuestions();
    }

    loadQuestions();
  </script>
</body>
</html>