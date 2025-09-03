import { NextResponse } from "next/server";

export async function POST() {
  try {
    // TODO: ここでPusherにイベントを送信するロジックを後で追加します
    // console.log('Button pushed!')

    // 現時点では、まだゴールしていないという仮のレスポンスを返します
    const responsePayload = {
      message: "OK",
      goalReached: false, // TODO: 実際のカウントに応じてこの値を変更します
    };

    return NextResponse.json(responsePayload, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
