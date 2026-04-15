import { Suspense } from 'react';
import styles from "./page.module.css";
import Search from "@/app/ui/search";
import { ShopGridSkeleton } from "@/app/ui/skeletons";
import ProductGrid from "@/app/ui/shop/product-grid"; 
import Link from "next/link";
import { fetchAllProducts } from "@/lib/data";

export default async function ShopPage(props: {
  searchParams?: Promise<{
    query?: string;
    category?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const category = searchParams?.category || '';

  const allProducts = await fetchAllProducts();
  const categories = Array.from(
    new Set(allProducts.map((p: any) => p.category).filter(Boolean))
  ) as string[];

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <h1 className={styles.heading}>Shop Our Featured Pieces</h1>
        <div className={styles.controls}>
          <Search placeholder="Search handcrafted treasures..." />
          
          <div className={styles.filterBar}>
            {/* <Link 
              href="/shop" 
              className={!category ? styles.activeFilter : styles.filterBtn}
            >
              All
            </Link> */}

            {categories.map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${cat}${query ? `&query=${query}` : ''}`}
                className={category === cat ? styles.activeFilter : styles.filterBtn}
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <Suspense key={query + category} fallback={<ShopGridSkeleton />}>
          <ProductGrid query={query} category={category} />
        </Suspense>
      </section>
    </main>
  );
}