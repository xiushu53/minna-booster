import { NextResponse } from "next/server";
import { pusherServer } from "@/lib/pusher";
import { setGoal } from "@/lib/server/store";

export async function POST(request: Request) {
  try {
    const { goal } = await request.json();
    if (![50, 100, 150, 200].includes(goal)) {
      return NextResponse.json(
        { message: "Invalid goal value" },
        { status: 400 }
      );
    }

    await setGoal(goal);

    // 全クライアントにgoalの変更を通知します
    await pusherServer.trigger("minnabooster-channel", "goal-update", {
      goal,
    });

    return NextResponse.json(
      { message: "Goal updated", goal },
      { status: 200 }
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Error setting goal" },
      { status: 500 }
    );
  }
}
