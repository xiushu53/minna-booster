# MinnaBooster (みんなブースター)

欽ちゃんの仮装大賞のメーターをモチーフにした、リアルタイム参加型アプリケーション。
イベント参加者が一体となって楽しめるシンプルなWebアプリケーションです。

## 概要

メインスクリーンに表示されるメーターに対し、参加者は手元のスマートフォンからボタンを操作します。全員の操作がリアルタイムで集計され、目標値に到達するとお祝いのアニメーションが表示されます。

- **メーターページ (`/meter`)**: 全員の操作結果をリアルタイムで表示するスクリーン。
- **ボタンページ (`/button`)**: 参加者が手元のスマートフォンで操作するページ。
- **案内ページ (`/`)**: 参加者をボタンページへ誘導するためのQRコードを表示します。

## 技術スタック

本プロジェクトで採用している、または採用予定の技術スタックです。

| カテゴリ | 技術 | 役割 |
| :--- | :--- | :--- |
| **フレームワーク** | [Next.js](https://nextjs.org/) 15 (App Router) | アプリケーションの基本骨格、UI構築 |
| **UIコンポーネント** | [shadcn/ui](https://ui.shadcn.com/) | 高品質でカスタマイズ性の高いUIコンポーネント群 |
| **アニメーション** | [Framer Motion](https://www.framer.com/motion/) | インタラクティブなアニメーション |
| **エフェクト** | [react-canvas-confetti](https://github.com/catdad/canvas-confetti) | お祝いの紙吹雪エフェクト |
| **リアルタイム通信** | [Pusher](https://pusher.com/) | リアルタイムな双方向通信 |
| **ホスティング** | [Vercel](https://vercel.com/) | デプロイとホスティング |
| **パッケージ管理** | [pnpm](https://pnpm.io/) | パッケージマネージャー |
| **コード品質** | [Biome](https://biomejs.dev/) | リンター、フォーマッター、その他ツールチェイン |
| **実行環境** | [Turbopack](https://turbo.build/pack) | Next.js用の高速な開発サーバー |

## ディレクトリ構成

```
.
├── docs/                     # プロジェクト資料
├── public/                   # 静的アセット (画像など)
├── src/                      # アプリケーションのソースコード
│   ├── app/                  # Next.jsのルーティング規約
│   ├── _components/          # UIコンポーネント (プライベート)
│   ├── _hooks/               # カスタムフック/ロジック (プライベート)
│   ├── _lib/                 # 外部連携/ユーティリティ (プライベート)
│   └── _types/               # TypeScript型定義 (プライベート)
├── .env.local                # 環境変数 (PusherのAPIキーなど)
├── biome.json                # Biome設定ファイル
├── next.config.mjs           # Next.js設定ファイル
├── package.json              # プロジェクト定義と依存関係
└── tsconfig.json             # TypeScript設定
```

より詳細な開発ルールやコンポーネント設計については、`docs/00_project_guidline.md`を参照してください。

## ローカル開発環境のセットアップ

1. **依存関係のインストール:**
   ```bash
   pnpm install
   ```

2. **環境変数の設定:**
   プロジェクトルートに`.env.local`ファイルを作成し、Pusherなどの外部サービスのAPIキーを設定します。
   ```
   # .env.local.example
   NEXT_PUBLIC_PUSHER_KEY="..."
   NEXT_PUBLIC_PUSHER_CLUSTER="..."
   ```

3. **開発サーバーの起動:**
   ```bash
   pnpm dev
   ```
   開発サーバーが `http://localhost:3000` で起動します。

## 利用可能なスクリプト

- `pnpm dev`: 開発サーバーを起動します (Turbopack利用)。
- `pnpm build`: プロダクション用にビルドします。
- `pnpm start`: プロダクションビルドを起動します。
- `pnpm check`: Biomeを使ってコードのフォーマットとリンターを実行します。
- `pnpm check:fix`: Biomeを使ってコードのフォーマットとリンターを自動修正します。

---
このプロジェクトの詳細な設計やガイドラインについては、`docs`ディレクトリ内のドキュメントを参照してください。