import postgres from 'postgres';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Fetch all products with Seller details and calculated Average Ratings
export async function fetchAllProducts() {
  try {
    const data = await sql<any[]>`
      SELECT 
        p.id, 
        p.name, 
        p.description, 
        p.price, 
        p.image_url, 
        p.category,
        s.shop_name as seller_name,
        s.avatar_url as seller_avatar,
        COALESCE(AVG(r.rating), 5.0) as rating
      FROM products p
      LEFT JOIN sellers s ON p.seller_id = s.id
      LEFT JOIN reviews r ON p.id = r.product_id
      GROUP BY p.id, s.shop_name, s.avatar_url
      ORDER BY p.name ASC
    `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch marketplace items.');
  }
}

// Fetch latest 3 reviews for homepage display
export async function fetchHomeReviews() {
  try {
    const data = await sql`
      SELECT r.comment, r.rating, u.name as user_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      ORDER BY r.created_at DESC
      LIMIT 3
    `;
    return data;
  } catch (error) {
    console.error('Database Error:', error);
    return [];
  }
}

// Fetch detailed product info by ID, including Seller details and Reviews
export async function fetchProductDetails(id: string) {
  try {
    const product = await sql`
      SELECT p.*, s.shop_name, s.bio as seller_bio, s.avatar_url as seller_avatar
      FROM products p
      JOIN sellers s ON p.seller_id = s.id
      WHERE p.id = ${id}
    `;

    const reviews = await sql`
      SELECT r.*, u.name as user_name
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ${id}
      ORDER BY r.created_at DESC
    `;

    return {
      product: product[0] || null,
      reviews: reviews
    };
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch product details.');
  }
}