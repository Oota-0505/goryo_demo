# 五菱産業株式会社 - ウェブサイト案1

## 概要
FigmaデザインをベースにHTML/CSS/JavaScriptで再現したウェブサイトです。

## ファイル構成
```
GORYOU/
├── index.html          # メインHTMLファイル
├── style.css           # スタイルシート
├── script.js           # JavaScriptファイル（スライダー機能など）
├── images/             # 画像フォルダ
│   ├── logo.png
│   ├── mainv_01-e57982.png
│   ├── mainv_02-e57982.png
│   ├── mainv_03-e57982.png
│   ├── mainv_04-e57982.png
│   ├── mainv_05-e57982.png
│   ├── mainv_07-187e54.png
│   ├── mainv_08-187e54.png
│   ├── voice_01-7fbb59.png
│   ├── voice_02-6087fa.png
│   ├── voice_03-32ea60.png
│   ├── voice_04-cabee8.png
│   ├── works_01-5d5c2a.png
│   ├── works_02-41a32d.png
│   ├── works_03-5d5c2a.png
│   ├── concept_bg-770375.png
│   └── business_bg-7dc219.png
└── README.md           # このファイル
```

## 主な機能

### 1. ヘッダーナビゲーション
- 固定ヘッダー（スクロール時も表示）
- ロゴとナビゲーションメニュー
- レスポンシブ対応

### 2. ヒーローセクション
- 自動スライドショー（5秒間隔）
- 7枚の画像を順次表示
- ホバーで一時停止機能
- スムーズなフェードイン/アウト

### 3. 特徴セクション（FEATURE）
- 3つの主要特徴を表示
- 「誠実さと実績」「技術力と対応力」「地元密着型」

### 4. お客様の声セクション（VOICE）
- 施工事例のスライダー
- 前/次ボタンで操作可能
- カード形式のデザイン

### 5. 会社情報セクション（COMPANY）
- 背景画像とオーバーレイ
- コンセプト紹介

### 6. 施工事例セクション（WORKS）
- 3つの主要事例を表示
- 画像とテキストのカード形式

### 7. 事業内容セクション（BUSINESS）
- 背景画像付き
- 会社の強みを紹介

### 8. 対応エリアセクション（AREA）
- 群馬県、埼玉県、栃木県のエリア情報

### 9. フッター
- 会社情報（住所、電話番号）
- サイトマップ
- 4カラムレイアウト

## 技術仕様

### HTML5
- セマンティックHTML
- アクセシビリティ対応

### CSS3
- Flexboxレイアウト
- CSSトランジション/アニメーション
- レスポンシブデザイン（モバイル対応）
- Google Fonts（Inter、Noto Serif JP）

### JavaScript
- バニラJavaScript（フレームワーク不使用）
- スライダー機能
- スムーズスクロール
- Intersection Observer API（スクロールアニメーション）
- 遅延画像読み込み（Lazy Loading）

## ブラウザ対応
- Chrome（最新版）
- Firefox（最新版）
- Safari（最新版）
- Edge（最新版）

## 使い方

1. ファイルをダウンロード
2. `index.html`をブラウザで開く
3. ローカルサーバーで実行する場合：
   ```bash
   # Python 3の場合
   python -m http.server 8000
   
   # Node.jsの場合
   npx http-server
   ```

## レスポンシブ対応
- デスクトップ：1440px以上
- タブレット：768px〜1199px
- モバイル：768px未満

## カスタマイズ

### 色の変更
`style.css`の以下の部分を編集：
- メインカラー：`#000`（黒）
- アクセントカラー：`#284167`（青）
- 背景色：`#fff`（白）、`#F4F4F4`（グレー）

### スライダー速度の変更
`script.js`の以下の行を編集：
```javascript
let heroSliderInterval = setInterval(nextSlide, 5000); // 5000ms = 5秒
```

## 今後の改善案
- モバイルメニュー（ハンバーガーメニュー）の追加
- アニメーションの強化
- パフォーマンス最適化
- アクセシビリティの向上
- SEO対策

## 作成日
2025年10月13日

## バージョン
1.0.0

# goryo_demo
