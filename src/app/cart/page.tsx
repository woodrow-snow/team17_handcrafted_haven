"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";

export default function CartPage() {
  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);
  }, []);

  function updateQuantity(id: number, amount: number) {
    const updated = cart
      .map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + amount) }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    // Force badge update
    window.dispatchEvent(new Event("storage"));
  }

  function removeItem(id: number) {
    const updated = cart.filter((item) => item.id !== id);
    setCart(updated);
    localStorage.setItem("cart", JSON.stringify(updated));

    // Force badge update
    window.dispatchEvent(new Event("storage"));
  }

  const total = cart.reduce((sum, item) => {
    const price = Number(item.price.replace("$", ""));
    return sum + price * item.quantity;
  }, 0);

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>Your Cart</h1>

      {cart.length === 0 && <p>Your cart is empty.</p>}

      <div className={styles.items}>
        {cart.map((item) => (
          <div key={item.id} className={styles.item}>
            <div className={styles.imageWrap}>
              <Image
                src={item.image}
                alt={item.name}
                fill
                className={styles.image}
              />
            </div>

            <div className={styles.info}>
              <h2>{item.name}</h2>
              <p className={styles.price}>{item.price}</p>

              <div className={styles.quantityRow}>
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>

              <button
                className={styles.removeButton}
                onClick={() => removeItem(item.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className={styles.totalBox}>
          <p>
            Total: <strong>${total.toFixed(2)}</strong>
          </p>

          {/* CHECKOUT BUTTON */}
          <div className={styles.checkoutRow}>
            <a href="/checkout" className={styles.checkoutButton}>
              Proceed to Checkout
            </a>
          </div>
        </div>
      )}
    </main>
  );
}
