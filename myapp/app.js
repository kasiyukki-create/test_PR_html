const express = require('express');
const app = express();

// ミドルウェアの設定（APIルートより前に記述）
app.use(express.json());
app.use(express.static('public'));

// ルート1：トップページ
app.get('/', (req, res) => {
  res.send('トップページです');
});

// ルート2：自己紹介ページ
app.get('/about', (req, res) => {
  res.send('自己紹介ページです');
});

// ルート3：現在時刻
app.get('/time', (req, res) => {
  const now = new Date().toLocaleString('ja-JP');
  res.send('現在時刻：' + now);
});

// ルート4：APIテスト
app.get('/api/test', (req, res) => {
  res.json({
    message: 'APIが動いています',
    status: 'ok'
  });
});

// サーバーの状態確認用API（fetch_status.html用）
app.get('/status', (req, res) => {
  res.json({
    message: 'サーバーは正常に動作しています'
  });
});

const messages = [];

// GET : メッセージ一覧
app.get('/api/messages', (req, res) => {
  res.json(messages);
});

app.get('/status', (req, res) => {
  res.json({ status: 'ok', message: 'サーバーが動いています' });
});

// POST : メッセージ追加
app.post('/api/messages', (req, res) => {
  const { username, text } = req.body;
  const newMessage = {
    id: messages.length + 1,
    username,
    text
  };
  messages.push(newMessage);
  res.json(newMessage);
});

// サーバー起動
app.listen(3000, () => {
  console.log('サーバーが起動しました: http://localhost:3000');
});