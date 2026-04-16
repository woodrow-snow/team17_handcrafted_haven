"use client";

import styles from "./edit.module.css";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function EditProductForm({ product }: { product: any }) {
  const router = useRouter();

  async function handleSubmit(e: any) {
    e.preventDefault();

    const formData = new FormData(e.target);

    await fetch(`/api/products/${product.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        seller_id: product.seller_id,
        name: formData.get("name"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        image_url: formData.get("image_url"),
        category: formData.get("category"),
        stock: Number(formData.get("stock")),
      }),
    });

    toast.success("Product updated successfully!");
    router.push("/seller/products");
  }

  return (
    <div className={styles.page}>
      <form onSubmit={handleSubmit} className={styles.card}>
        <h2 className={styles.heading}>Edit Product</h2>

        {/* IMAGE PREVIEW */}
        <div className={styles.imagePreview}>
          <img src={product.image_url} alt={product.name} />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Product Name</label>
          <input
            name="name"
            defaultValue={product.name}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Description</label>
          <textarea
            name="description"
            defaultValue={product.description}
            className={styles.textarea}
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label className={styles.label}>Price ($)</label>
            <input
              name="price"
              type="number"
              defaultValue={product.price}
              className={styles.input}
            />
          </div>

          <div className={styles.field}>
            <label className={styles.label}>Stock</label>
            <input
              name="stock"
              type="number"
              defaultValue={product.stock}
              className={styles.input}
            />
          </div>
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Image URL</label>
          <input
            name="image_url"
            defaultValue={product.image_url}
            className={styles.input}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Category</label>
          <input
            name="category"
            defaultValue={product.category}
            className={styles.input}
          />
        </div>

        {/* ACTION BUTTONS */}
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={() => router.push("/seller/products")}
          >
            Cancel
          </button>

          <button type="submit" className={styles.saveButton}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}
