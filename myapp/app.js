const express = require('express');
const app = express();

// 1. GET /api/tasks (タスク配列を返す)
app.get('/api/tasks', (req, res) => {
    res.json([
        { id: 1, title: "情報工学概論レポート", deadline: "2026-05-25", completed: false },
        { id: 2, title: "Webシステム開発演習課題", deadline: "2026-05-29", completed: false }
    ]);
});

// 2. POST /api/tasks (作成タスク)
app.post('/api/tasks', (req, res) => {
    res.json({ id: 3, title: "新しい課題名", deadline: "2026-05-30", completed: false });
});

// 3. GET /api/events (イベント一覧)
app.get('/api/events', (req, res) => {
    res.json([
        { id: 1, name: "夏期インターンシップ説明会", event_date: "2026-06-10", apply_deadline: "2026-05-31" }
    ]);
});

// 4. POST /api/events (イベント詳細)
app.post('/api/events', (req, res) => {
    res.json({ id: 2, name: "新規イベント名", event_date: "2026-06-15", apply_deadline: "2026-06-01" });
});

// 5. GET /api/limit (期限ゲット)
app.get('/api/limit', (req, res) => {
    res.json({ urgent_tasks_count: 2, days_left_threshold: 3 });
});

// 6. POST /api/limit (期限詳細)
app.post('/api/limit', (req, res) => {
    res.json({ status: "success", message: "期限の通知設定を更新しました", days_left_threshold: 5 });
});

// サーバーの起動設定
app.listen(3000, () => {
    console.log('サーバーが起動しました！');
});