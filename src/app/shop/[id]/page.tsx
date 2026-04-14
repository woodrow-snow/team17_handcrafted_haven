"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import styles from "./page.module.css";

const products = [
    {
        id: 1,
        name: "Walnut Accent Chair",
        price: "$189",
        description:
            "A clean handcrafted chair with a warm walnut finish for modern living spaces.",
        image: "/images/hero-image.jpg",
    },
    {
        id: 2,
        name: "Rustic Coffee Table",
        price: "$245",
        description:
            "Solid wood center table built to bring warmth and character into the room.",
        image: "/images/hero-image.jpg",
    },
    {
        id: 3,
        name: "Floating Wall Shelf",
        price: "$72",
        description:
            "Minimal shelf piece designed for décor, books, and small everyday items.",
        image: "/images/hero-image.jpg",
    },
    {
        id: 4,
        name: "Dining Bench",
        price: "$158",
        description:
            "Hand-finished bench seating with a sturdy frame and timeless farmhouse feel.",
        image: "/images/hero-image.jpg",
    },
    {
        id: 5,
        name: "Bedside Table",
        price: "$129",
        description:
            "Compact bedside storage piece crafted for both style and daily function.",
        image: "/images/hero-image.jpg",
    },
    {
        id: 6,
        name: "Entryway Console",
        price: "$210",
        description:
            "Slim handcrafted console table ideal for hallways, foyers, and display décor.",
        image: "/images/hero-image.jpg",
    },
];

const tempReviews = [
    {
        product_id: 1,
        name: "Woody Mason",
        rating: 5,
        comment: "This product is amazing! I can't imagine my life without it now!"
    },
    {
        product_id: 1,
        name: "Chad",
        rating: 4,
        comment: "Pretty good product!"
    },
    {
        product_id: 2,
        name: "Jeremy",
        rating: 3,
        comment: "It was good but it could be better."
    },
    {
        product_id: 2,
        name: "Desmond",
        rating: 5,
        comment: "This is the best thing I own!"
    },
    {
        product_id: 3,
        name: "Roseman",
        rating: 2,
        comment: "It came broken in the mail!"
    },
    {
        product_id: 3,
        name: "Jerry",
        rating: 5,
        comment: "I bought this as a gift for my wife and she loved it"
    },
    {
        product_id: 4,
        name: "Jasmine",
        rating: 5,
        comment: "If I could give this product a 6 I would!"
    },
    {
        product_id: 4,
        name: "Daisy",
        rating: 4,
        comment: "Soild product! TYSM!!"
    },
    {
        product_id: 5,
        name: "Maria",
        rating: 5,
        comment: "I don't know how I got along before this came into my life!"
    },
    {
        product_id: 5,
        name: "David",
        rating: 1,
        comment: "This was probably the worst product I have ever received"
    },
    {
        product_id: 6,
        name: "Aurora",
        rating: 5,
        comment: "I got this for my home and I love it!"
    },
    {
        product_id: 6,
        name: "Matthew",
        rating: 3,
        comment: "Good product, but there are things that could be better."
    }
];

export default function ProductDetailPage() {
    const { id } = useParams() as { id: string }; 
    const router = useRouter();

    const product = products.find((p) => p.id === Number(id));

    if (!product) {
        return (
            <main className={styles.page}>
                <p>Product not found.</p>
            </main>
        );
    }

    function addToCart() {
        if (!product) return;
        
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");

        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1,
        });

        localStorage.setItem("cart", JSON.stringify(cart));

        window.dispatchEvent(new Event("storage"));

        alert(`${product.name} added to cart!`);
    }

    return (
        <main className={styles.page}>
            <button className={styles.backButton} onClick={() => router.back()}>
                ← Back to Shop
            </button>

            <div className={styles.layout}>
                <div className={styles.imageWrap}>
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className={styles.image}
                    />
                </div>

                <div className={styles.info}>
                    <h1 className={styles.name}>{product.name}</h1>
                    <p className={styles.price}>{product.price}</p>
                    <p className={styles.description}>{product.description}</p>

                    <button className={styles.addButton} onClick={addToCart}>
                        Add to Cart
                    </button>
                </div>
            </div>
            <h2 className={styles.reviewsHeader}>Reviews</h2>
            {/* adding review cards */}
            <div className={styles.reviews}>
                {tempReviews.map((review) => {
                    if (review.product_id !== product.id) return null;

                    return (
                        <section className={styles.review}>
                            <span>{review.name}</span>
                            <span className={styles.rating}>{review.rating} / 5</span>
                            <span className={styles.comment}>"{review.comment}"</span>
                        </section>
                    );
                })}
            </div>
        </main>
    );
}
