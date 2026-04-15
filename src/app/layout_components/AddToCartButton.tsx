'use client';

import { Product } from '@/lib/definitions';
import styles from '../shop/[id]/page.module.css';

export default function AddToCartButton({ product }: { product: Product }) {
  function addToCart() {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const existingItemIndex = cart.findIndex((item: any) => item.id === product.id);

    if (existingItemIndex > -1) {
      cart[existingItemIndex].quantity += 1;

    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image_url,
        quantity: 1,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    window.dispatchEvent(new Event("storage"));
  }

  return (
    <button className={styles.addButton} onClick={addToCart}>
      Add to Cart
    </button>
  );
}