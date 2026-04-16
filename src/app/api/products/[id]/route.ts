import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

// ------------------------------------------------------------
// GET /api/products/[id]
// ------------------------------------------------------------
export async function GET(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
    ) {
    const { id } = await params; // REQUIRED in Next.js 16

    try {
        const product = await sql`
            SELECT * FROM products WHERE id = ${id}
        `;

        if (product.length === 0) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(product[0]);
    }   catch (error) {
        console.error("GET /api/products/[id] error:", error);
        return NextResponse.json(
            { error: "Failed to fetch product" },
            { status: 500 }
        );
    }
}

// ------------------------------------------------------------
// PUT /api/products/[id]
// ------------------------------------------------------------
export async function PUT(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
)   {
    const { id } = await params; // REQUIRED in Next.js 16

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

        if (!seller_id) {
            return NextResponse.json(
                { error: "seller_id is required" },
                { status: 400 }
            );
        }

        const updated = await sql`
            UPDATE products
            SET
                name = ${name},
                description = ${description},
                price = ${price},
                image_url = ${image_url},
                category = ${category},
                stock = ${stock}
            WHERE id = ${id}
            RETURNING *
        `;

        if (updated.length === 0) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(updated[0]);
    }   catch (error) {
        console.error("PUT /api/products/[id] error:", error);
        return NextResponse.json(
            { error: "Failed to update product" },
            { status: 500 }
        );
    }
}

// ------------------------------------------------------------
// DELETE /api/products/[id]
// ------------------------------------------------------------
export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  try {
    const deleted = await sql`
      DELETE FROM products
      WHERE id = ${id}
      RETURNING *
    `;

    if (deleted.length === 0) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE /api/products/[id] error:", error);
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    );
  }
}
