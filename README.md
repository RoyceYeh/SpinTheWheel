# SpinTheWheel

這是一個使用 Vue 3 和 Vite 開發的投票系統專案，主要用於飯店評選活動。

## 功能特點

- 多主題投票系統
- 即時投票統計
- 防止重複投票機制
- 響應式設計
- 美觀的卡片式界面

## 技術棧

- Vue 3
- Vite
- Pinia (狀態管理)
- SCSS
- Vue Router

## 專案設置

```bash
# 安裝依賴
npm install

# 開發環境運行
npm run dev

# 生產環境構建
npm run build
```

## 專案結構

```
spinTheWheel/
├── src/                    # 源代碼目錄
│   ├── assets/            # 靜態資源文件
│   ├── components/        # Vue 組件
│   ├── router/           # 路由配置
│   ├── stores/           # Pinia 狀態管理
│   ├── utils/            # 工具函數
│   ├── views/            # 頁面視圖組件
│   ├── App.vue           # 根組件
│   └── main.js           # 應用入口文件
├── public/               # 公共資源目錄
├── index.html           # HTML 模板
├── vite.config.js       # Vite 配置文件
├── package.json         # 項目依賴配置
└── README.md            # 項目說明文檔
```

## 使用說明

1. 選擇投票主題
2. 瀏覽飯店卡片列表
3. 點擊心儀的飯店進行投票
4. 每個主題只能投票一次
5. 可以查看即時投票結果

## 開發指南

- 組件開發請遵循 Vue 3 組合式 API 規範
- 使用 Pinia 進行狀態管理
- 樣式使用 SCSS 預處理器
