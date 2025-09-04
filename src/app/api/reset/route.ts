import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { resetCount } from "@/lib/server/store";

export async function POST() {
  try {
    // サーバー上のカウントを0に戻す (非同期に)
    const newCount = await resetCount(); // 👈 awaitを追加

    await pusherServer.trigger("minnabooster-channel", "count-update", {
      count: newCount,
    });

    return NextResponse.json({ message: "Reset successful" }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
