import Image from "next/image";
import Link from "next/link";
import styles from "@/app/shop/page.module.css";
import { fetchAllProducts } from "@/lib/data";
import { ProductWithSeller } from "@/lib/definitions";

export default async function ProductGrid({ 
  query, 
  category 
}: { 
  query: string; 
  category: string; 
}) {
  const allProducts = (await fetchAllProducts()) as unknown as ProductWithSeller[];

  const filteredProducts = allProducts.filter((product) => {
    const searchStr = query.toLowerCase();
    const matchesQuery = 
      product.name.toLowerCase().includes(searchStr) ||
      product.description.toLowerCase().includes(searchStr) ||
      product.seller_name?.toLowerCase().includes(searchStr);
    
    const matchesCategory = category ? product.category === category : true;
    return matchesQuery && matchesCategory;
  });

  if (filteredProducts.length === 0) {
    return <p className={styles.noResults}>No treasures found matching "{query}"</p>;
  }

  return (
    <div className={styles.grid}>
      {filteredProducts.map((product, index) => (
        <article key={product.id} className={styles.card}>
          <div className={styles.imageWrap}>
            {product.category && (
              <span className={styles.categoryBadge}>{product.category}</span>
            )}
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              unoptimized
              priority={index < 4}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className={styles.image}
            />
          </div>

          <div className={styles.cardBody}>
            <div className={styles.artisanInfo}>
              <div className={styles.avatarWrap}>
                <Image
                  src={product.seller_avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(product.seller_name || 'A')}&background=random`}
                  alt={product.seller_name || 'Artisan'}
                  width={32}
                  height={32}
                  className={styles.avatar}
                />
              </div>
              <span className={styles.artisanName}>
                {product.seller_name || 'Unknown Artisan'}
              </span>
            </div>

            <div className={styles.titleRow}>
              <h2 className={styles.productName}>{product.name}</h2>
              <p className={styles.price}>${Number(product.price).toFixed(2)}</p>
            </div>
            
            <p className={styles.description}>{product.description}</p>
            
            <Link href={`/shop/${product.id}`} className={styles.cardButton}>
              View Details
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}