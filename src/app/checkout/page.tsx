"use client";

import { useState, useEffect } from "react";
import styles from "./checkout.module.css";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const router = useRouter();
  const [cart, setCart] = useState<any[]>([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("cart") || "[]");
    setCart(stored);

    const sum = stored.reduce((acc: number, item: any) => {
      const price = Number(item.price.replace("$", ""));
      return acc + price * item.quantity;
    }, 0);


    setTotal(sum);
  }, []);

  function handleSubmit(e: any) {
    e.preventDefault();

    // Clear cart
    localStorage.removeItem("cart");

     // Force badge update
    window.dispatchEvent(new Event("storage"));

    // Redirect to confirmation page
    router.push("/confirmation");
  }

  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Checkout</h1>

      <div className={styles.container}>
        {/* LEFT SIDE — FORM */}
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2 className={styles.sectionTitle}>Your Information</h2>

          <label>
            Full Name
            <input type="text" required />
          </label>

          <label>
            Email Address
            <input type="email" required />
          </label>

          <label>
            Shipping Address
            <textarea required />
          </label>

          <button type="submit" className={styles.submitButton}>
            Place Order
          </button>
        </form>

        {/* RIGHT SIDE — ORDER SUMMARY */}
        <div className={styles.summary}>
          <h2 className={styles.sectionTitle}>Order Summary</h2>

          {cart.map((item) => (
            <div key={item.id} className={styles.item}>
              <div>{item.name}</div>
              <div>
                {item.quantity} × ${item.price}
              </div>
            </div>
          ))}

          <div className={styles.totalRow}>
            <strong>Total:</strong>
            <strong>${total.toFixed(2)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
