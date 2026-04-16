import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// ------------------------------------------------------------
// GET /api/products/seller?seller_id=UUID
// Returns all products for a specific seller
// ------------------------------------------------------------
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const seller_id = searchParams.get("seller_id");

        if (!seller_id) {
            return NextResponse.json(
                { error: "seller_id is required" },
                { status: 400 }
            );
        }

        const products = await sql`
            SELECT *
            FROM products
            WHERE seller_id = ${seller_id}
            ORDER BY id DESC
        `;

        return NextResponse.json(products);
    }   catch (error) {
        console.error("GET /api/products/seller error:", error);
        return NextResponse.json(
            { error: "Failed to fetch seller products" },
            { status: 500 }
        );
    }
}
