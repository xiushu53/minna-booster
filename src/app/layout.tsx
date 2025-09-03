import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Google Fontsから"Inter"フォントを読み込みます
const inter = Inter({ subsets: ["latin"] });

// ページのメタ情報を設定します
export const metadata: Metadata = {
  title: "MinnaBooster",
  description: "みんなでメーターをブーストしよう！",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // 言語を日本語に設定します
    <html lang="ja">
      {/* bodyタグにフォントクラスを適用します */}
      <body className={inter.className}>
        {/* ここに各ページコンポーネントが挿入されます */}
        {children}
      </body>
    </html>
  );
}
