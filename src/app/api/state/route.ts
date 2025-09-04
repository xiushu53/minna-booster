import { NextResponse } from "next/server";
import { getState } from "@/lib/server/store";

// Vercelのキャッシュを無効にし、常に最新のデータを取得するようにします
export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const { count, goal } = await getState();
    return NextResponse.json({ count, goal }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { message: "Error fetching state" },
      { status: 500 }
    );
  }
}
