"use client";

import styles from "../form.module.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const router = useRouter();

  const SELLER_ID = "870f6c70-e6d4-4b99-bfcb-7e8a7426f186";

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    image_url: "",
    category: "",
    stock: "",
  });

  const [loading, setLoading] = useState(false);

  function handleChange(e:any) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e:any) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          seller_id: SELLER_ID,
          ...form,
          price: Number(form.price),
          stock: Number(form.stock),
        }),
      });

      if (!res.ok) {
        toast.error("Failed to create product");
        return;
      }

      toast.success("Product created successfully!");

      setTimeout(() => {
        router.push("/seller/products");
      }, 1200);
    } catch (err) {
      console.error("Error creating product:", err);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <h2 className={styles.heading}>Add New Product</h2>

        <div className={styles.field}>
          <label className={styles.label}>Product Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            className={styles.textarea}
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Price ($)</label>
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Stock</label>
            <input
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Image URL</label>
          <input
            name="image_url"
            value={form.image_url}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => router.push("/seller/products")}
          >
            Cancel
          </button>

          <button type="submit" className={styles.saveButton} disabled={loading}>
            {loading ? "Saving..." : "Create Product"}
          </button>
        </div>
      </form>
    </div>
  );
}
