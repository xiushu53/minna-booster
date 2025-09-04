import { NextResponse } from "next/server";
import { getCount } from "@/lib/server/store";

export async function GET() {
  try {
    const count = await getCount();
    return NextResponse.json({ count }, { status: 200 });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}
