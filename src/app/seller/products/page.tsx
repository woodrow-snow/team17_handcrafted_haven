import Link from "next/link";
import { fetchAllProducts } from "@/lib/data";
import { redirect } from "next/navigation";
import styles from "./dashboard.module.css";
import { ToastBridge } from "./ToastBridge";

export default async function SellerProductsPage(props: any) {
  const searchParams = await props.searchParams;   
  const products = await fetchAllProducts();

  async function deleteProduct(formData: FormData) {
  "use server";

  const id = formData.get("id") as string;

  const base = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  await fetch(`${base}/api/products/${id}`, {
    method: "DELETE",
  });

  redirect("/seller/products?toast=Product deleted");
  }

  return (
    <div className={styles.page}>
      {searchParams?.toast && <ToastBridge message={searchParams.toast} />}

      <div className={styles.headerRow}>
        <h1 className={styles.title}>Your Products</h1>

        <Link href="/seller/products/new" className={styles.addButton}>
          + Add New Product
        </Link>
      </div>

      <div className={styles.grid}>
        {products.map((p) => (
          <div key={p.id} className={styles.card}>
            <div className={styles.imageWrapper}>
              <img src={p.image_url} alt={p.name} />
            </div>

            <div className={styles.name}>{p.name}</div>
            <div className={styles.price}>${p.price}</div>

            <div className={styles.actions}>
              <Link
                href={`/seller/products/${p.id}/edit`}
                className={styles.editButton}
              >
                Edit
              </Link>

              <form action={deleteProduct}>
                <input type="hidden" name="id" value={p.id} />
                <button type="submit" className={styles.deleteButton}>
                  Delete
                </button>
              </form>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
