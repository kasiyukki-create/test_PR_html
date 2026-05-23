const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

// ★★★ ここを追加 ★★★
app.use(express.static('public'));   // publicフォルダ内のHTMLを公開

// 以降はそのまま...

// ====================== API エンドポイント ======================

// 1. GET /api/tasks - タスク一覧
app.get('/api/tasks', (req, res) => {
    res.json([
        { id: 1, title: "情報工学概論レポート", deadline: "2026-05-25", completed: false },
        { id: 2, title: "Webシステム開課題", deadline: "2026-05-29", completed: false }
    ]);
});

// 2. POST /api/tasks - 新規タスク作成（課題で必須）
app.post('/api/tasks', (req, res) => {
    const { title, deadline, completed = false } = req.body;   // 分割代入

    const newTask = {
        id: Date.now(),           // 簡易ID
        title,
        deadline,
        completed,
        createdAt: new Date().toISOString()
    };

    console.log('📌 新規タスク受信:', newTask);   // ターミナルに表示

    res.json({
        message: "タスクを作成しました",
        task: newTask
    });
});

// 3. GET /api/events
app.get('/api/events', (req, res) => {
    res.json([
        { id: 1, name: "臨地実習説明会", event_date: "2026-06-10", apply_deadline: "2026-05-31" }
    ]);
});

// 4. POST /api/events
app.post('/api/events', (req, res) => {
    const { name, event_date, apply_deadline } = req.body;

    const newEvent = {
        id: Date.now(),
        name,
        event_date,
        apply_deadline,
        createdAt: new Date().toISOString()
    };

    console.log('🎉 新規イベント受信:', newEvent);

    res.json({
        message: "イベントを追加しました",
        event: newEvent
    });
});

// サーバー起動
app.listen(port, () => {
    console.log(`🚀 サーバーが起動しました → http://localhost:${port}`);
});