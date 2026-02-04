import "dotenv/config";
import { NextResponse } from "next/server";
import { orderService } from "@/lib/order.service";

export async function GET() {
  try {
    const orders = await orderService.getAll();
    return NextResponse.json(orders);
  } catch (error) {
    console.error("GET /api/orders error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    if (!body?.userId || !body?.total) {
      return NextResponse.json(
        { error: "userId and total are required" },
        { status: 400 }
      );
    }

    const order = await orderService.create(
      body.userId,
      body.total,
      body.status || "pending"
    );
    return NextResponse.json(order, { status: 201 });
  } catch (e: any) {
    console.error("POST /api/orders error:", e);
    return NextResponse.json({ error: e?.message ?? "create failed" }, { status: 400 });
  }
}
