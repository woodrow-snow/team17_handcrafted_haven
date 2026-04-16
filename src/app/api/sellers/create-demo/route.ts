import { NextResponse } from "next/server";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET() {
    try {
        // Generate a unique email to avoid duplicate constraint errors
        const randomEmail = `demo_${crypto.randomUUID()}@example.com`;

        // 1. Create a demo user (matching your schema)
        const user = await sql`
            INSERT INTO users (id, name, email, password)
            VALUES (
                gen_random_uuid(),
                'Demo User',
                ${randomEmail},
                'password123'
            )
            RETURNING *
        `;

        const userId = user[0].id;

        // 2. Create a seller linked to that user
        const seller = await sql`
            INSERT INTO sellers (id, user_id, shop_name, bio, avatar_url)
            VALUES (
                gen_random_uuid(),
                ${userId},
                'Demo Artisan Shop',
                'Handcrafted goods made with care.',
                'https://placehold.co/200x200'
            )
            RETURNING *
        `;

        return NextResponse.json({
            message: "Demo seller created successfully",
            seller_id: seller[0].id,
            user_id: userId,
            email: randomEmail  
        });
    }   catch (error) {
        console.error("Error creating demo seller:", error);
        return NextResponse.json(
            { error: "Failed to create demo seller", details: String(error) },
            { status: 500 }
        );
    }
}
