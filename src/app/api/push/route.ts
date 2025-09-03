import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { incrementCount } from "@/lib/server/store";

export async function POST() {
  try {
    // サーバー上のカウントを1増やし、現在のカウントとゴール状態を取得
    const { currentCount, goalReached } = incrementCount();

    // 'minnabooster-channel' というチャンネルに 'count-update' というイベントを送信
    // メッセージの内容として、現在のカウント数を渡す
    await pusherServer.trigger("minnabooster-channel", "count-update", {
      count: currentCount,
    });

    // ボタンページには、ゴールに到達したかどうかを返す
    return NextResponse.json({ message: "OK", goalReached }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
