export type Product = {
    id: string;
    seller_id: string;
    name: string;
    description: string;
    price: number;
    image_url: string;
    category: string;
    stock: number;
};

export type User = {
    id: string;
    name: string;
    email: string;
    password?: string;
};

export type Seller = {
    id: string;
    user_id: string;
    shop_name: string;
    bio: string;
    avatar_url: string;
};

export type Review = {
    id: string;
    product_id: string;
    user_id: string;
    rating: number;
    comment: string;
    created_at: string;
};

export type ProductWithSeller = Product & {
    seller_name: string;
    seller_avatar: string;
};