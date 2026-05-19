# API 仕様

## 1. GET /api/tasks
- **説明**: タスク（課題期限など）の一覧を取得する
- **レスポンス**:
  ```json
  [
    {
      "id": 1,
      "title": "情報工学概論レポート",
      "deadline": "2026-05-25",
      "completed": false
    },
    {
      "id": 2,
      "title": "Webシステム開発演習課題",
      "deadline": "2026-05-29",
      "completed": false
    }
  ]
  {
  "title": "新しい課題名",
  "deadline": "2026-05-30"
}
{
  "id": 3,
  "title": "新しい課題名",
  "deadline": "2026-05-30",
  "completed": false
}