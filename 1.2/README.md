## RWD 參照表
| 名稱                      | 縮寫 | 範圍                  |
|---------------------------|-----|-----------------------|
| 超小號 (Extra small)       | xs  | 小型到大型的手機       | < 600px                |
| 小號 (Small)              | sm  | 小型到中型的平板       | 600px > < 960px        |
| 中號 (Medium)             | md  | 大型平板到筆記型電腦   | 960px > < 1280px       |
| 大號 (Large)              | lg  | 從筆記型電腦到桌上型電腦 | 1280px > < 1920px      |
| 超大號 (Extra large)      | xl  | 分辨率 1080p 到 1440p 的桌上型電腦 | 1920px > < 2560px |
| 超大號 (Extra extra large)| xxl | 4K 和超寬屏幕           | > 2560px               |

## 資料庫
#### 用戶表 (`users`)

| 字段名    | 類型         | 描述     |
|----------|------------|---------|
| user_id  | SERIAL (PK) | 用戶ID   |
| name     | VARCHAR     | 姓名     |
| address  | TEXT        | 地址     |
| phone    | VARCHAR     | 電話     |

#### 產品表 (`products`)

| 字段名      | 類型          | 描述   |
|-----------|-------------|------|
| product_id | SERIAL (PK) | 產品ID |
| name       | VARCHAR     | 產品名稱 |
| unit_price | DECIMAL     | 單價   |
| unit       | VARCHAR     | 單位   |

#### 訂單表 (`orders`)

| 字段名         | 類型         | 描述        |
|---------------|------------|------------|
| order_id      | SERIAL (PK) | 訂單ID      |
| user_id       | INTEGER (FK) | 用戶ID     |
| shipping_type | VARCHAR     | 配送方式    |
| total_amount  | DECIMAL     | 總額       |
| status        | VARCHAR     | 狀態       |
| shipping_time | TIMESTAMP   | 出貨時間    |
| tracking_number | VARCHAR   | 貨運單號    |
| created_at    | TIMESTAMP   | 訂單成立時間 |

#### 訂單明細表 (`order_details`)

| 字段名        | 類型          | 描述       |
|--------------|-------------|-----------|
| detail_id    | SERIAL (PK) | 明細ID     |
| order_id     | INTEGER (FK) | 訂單ID     |
| product_id   | INTEGER (FK) | 產品ID     |
| quantity     | INTEGER     | 數量       |
| unit_price   | DECIMAL     | 單價       |
| remark       | TEXT        | 備註       |
