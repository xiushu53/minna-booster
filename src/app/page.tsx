"use client";

import { QRCodeSVG } from "qrcode.react";
import { useEffect, useState } from "react";

export default function HomePage() {
  const [buttonUrl, setButtonUrl] = useState("");

  // ブラウザのURLを取得するため、クライアントコンポーネントにする必要があります
  useEffect(() => {
    // /buttonページへの完全なURLを構築
    const url = `${window.location.protocol}//${window.location.host}/button`;
    setButtonUrl(url);
  }, []);

  return (
    <main
      className="flex min-h-screen flex-col items-center justify-center p-8 text-center"
      style={{ backgroundColor: "var(--minna-background)" }}
    >
      <h1
        className="mb-4 text-6xl font-extrabold"
        style={{ color: "var(--minna-text-primary)" }}
      >
        MinnaBooster
      </h1>
      <p
        className="mb-12 max-w-2xl text-2xl"
        style={{ color: "var(--minna-text-secondary)" }}
      >
        スマホで下のQRコードを読み取って、みんなでメーターをブーストしよう！
      </p>

      <div className="rounded-lg bg-white p-6 shadow-2xl">
        {buttonUrl ? (
          // ▼▼▼ ここもQRCodeSVGに変更します ▼▼▼
          <QRCodeSVG
            value={buttonUrl}
            size={256}
            bgColor={"#ffffff"}
            fgColor={"#111827"} // --minna-background
            level={"L"}
            includeMargin={false}
          />
        ) : (
          // URLが読み込まれるまでのプレースホルダー
          <div className="h-[256px] w-[256px] animate-pulse rounded-md bg-gray-200" />
        )}
      </div>
      <p
        className="mt-8 text-lg"
        style={{ color: "var(--minna-text-secondary)" }}
      >
        {buttonUrl || "Loading..."}
      </p>
    </main>
  );
}
