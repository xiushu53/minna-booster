import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { incrementCount } from "@/lib/server/store";

export async function POST() {
  try {
    // サーバー上のカウントを1増やす (非同期に)
    const { currentCount, goalReached } = await incrementCount(); // 👈 awaitを追加

    await pusherServer.trigger("minnabooster-channel", "count-update", {
      count: currentCount,
    });

    return NextResponse.json({ message: "OK", goalReached }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
