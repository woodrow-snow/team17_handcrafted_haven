import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// ------------------------------------------------------------
// GET /api/products
// Public product listing with filtering + pagination
// ------------------------------------------------------------
export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);

        const category = searchParams.get("category");
        const search = searchParams.get("search");
        const minPrice = searchParams.get("minPrice");
        const maxPrice = searchParams.get("maxPrice");

        const page = Number(searchParams.get("page") || 1);
        const limit = Number(searchParams.get("limit") || 12);
        const offset = (page - 1) * limit;

        let whereClauses = [];
        let params: any[] = [];

        if (category) {
            params.push(category);
            whereClauses.push(`category = $${params.length}`);
        }

        if (search) {
            params.push(`%${search}%`);
            whereClauses.push(`name ILIKE $${params.length}`);
        }

        if (minPrice) {
            params.push(minPrice);
            whereClauses.push(`price >= $${params.length}`);
        }

        if (maxPrice) {
            params.push(maxPrice);
            whereClauses.push(`price <= $${params.length}`);
        }

        const whereSQL =
            whereClauses.length > 0 ? `WHERE ${whereClauses.join(" AND ")}` : "";

        const products = await sql.unsafe(
            `
            SELECT *
            FROM products
            ${whereSQL}
            ORDER BY id DESC
            LIMIT ${limit}
            OFFSET ${offset}
        `,
            params
        );

        return NextResponse.json(products);
    }   catch (error) {
        console.error("GET /api/products error:", error);
        return NextResponse.json(
            { error: "Failed to fetch products" },
            { status: 500 }
        );
    }
}

// ------------------------------------------------------------
// POST /api/products
// Create a new product (seller_id must be provided by frontend)
// ------------------------------------------------------------
export async function POST(req: Request) {
    try {
        const body = await req.json();

        const {
            seller_id,
            name,
            description,
            price,
            image_url,
            category,
            stock,
        } = body;

        if (!seller_id || !name || !price || !image_url) {
            return NextResponse.json(
                { error: "Missing required fields" },
                { status: 400 }
            );
        }

        const product = await sql`
            INSERT INTO products (
                seller_id,
                name,
                description,
                price,
                image_url,
                category,
                stock
            )
            VALUES (
                ${seller_id},
                ${name},
                ${description || ""},
                ${price},
                ${image_url},
                ${category || "Uncategorized"},
                ${stock || 0}
            )
            RETURNING *
        `;

        return NextResponse.json(product[0], { status: 201 });
    }   catch (error) {
        console.error("POST /api/products error:", error);
        return NextResponse.json(
            { error: "Failed to create product" },
            { status: 500 }
        );
    }
}
