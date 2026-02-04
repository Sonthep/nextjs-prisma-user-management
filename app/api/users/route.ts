import "dotenv/config";
import { NextResponse } from "next/server";
import { userService } from "@/lib/user.service";

export async function GET() {
  try {
    const users = await userService.getAll();
    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch users" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body?.email) {
      return NextResponse.json({ error: "email is required" }, { status: 400 });
    }

    const user = await userService.create(body.email, body.role || "user");
    return NextResponse.json(user, { status: 201 });
  } catch (e: any) {
    console.error("POST /api/users error:", e);
    return NextResponse.json({ error: e?.message ?? "create failed" }, { status: 400 });
  }
}
