import styles from "./page.module.css";
import Link from 'next/link';
import Image from 'next/image';
import { fetchAllProducts, fetchHomeReviews } from "@/lib/data";

export default async function Home() {
  const allProducts = await fetchAllProducts();
  const latestReviews = await fetchHomeReviews();
  
  // Show first 10 products
  const featuredProducts = allProducts.slice(0, 10); 

  return (
    <main className={styles.main}>
      
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroImageWrapper}>
          <Image 
            src="/images/hero-image.jpg"
            alt="Handcrafted Treasures"
            fill
            priority
            className={styles.heroImage}
          />
          <div className={styles.heroOverlay} />
        </div>

        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Discover Unique Handcrafted Treasures</h1>
          <p className={styles.heroDescription}>
            Shop one-of-a-kind artisan goods made with love and care by skilled 
            craftspeople around the world.
          </p>
          <Link href="/shop" className={styles.button}>
            Shop Now <span>→</span>
          </Link>
        </div>
      </section>

      {/* FEATURED COLLECTION */}
      <div className={styles.sectionWrapper}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionHeading}>Featured Collection</h2>
          <Link href="/shop" className={styles.viewAll}>View All →</Link>
        </div>
        
        <div className={styles.productGrid}>
          {featuredProducts.map((product: any, index: number) => (
            <Link href={`/shop/${product.id}`} key={product.id} className={styles.productCard}>
              <div className={styles.cardImageWrap}>
                <Image 
                  src={product.image_url}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.cardInfo}>
                <div className={styles.cardHeader}>
                  <p className={styles.sellerName}>{product.seller_name}</p>
                  <span className={styles.ratingBadge}>★ {Number(product.rating).toFixed(1)}</span>
                </div>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productPrice}>${Number(product.price).toFixed(2)}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* COMMUNITY REVIEWS */}
      {latestReviews.length > 0 && (
        <div className={styles.reviewsSection}>
          <div className={styles.sectionWrapper}>
            <h2 className={styles.sectionHeading} style={{textAlign: 'center'}}>Community Reviews</h2>
            <div className={styles.reviewsGrid}>
              {latestReviews.map((rev: any, index: number) => (
                <div key={index} className={styles.reviewCard}>
                  <div className={styles.stars}>{"★".repeat(rev.rating)}</div>
                  <p className={styles.comment}>"{rev.comment}"</p>
                  <p className={styles.reviewUser}>— {rev.user_name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ABOUT SECTION */}
      <div className={styles.sectionWrapper}>
        <div className={styles.splitLayout}>
          <div className={styles.textContent}>
            <h2 className={styles.sectionHeading} style={{textAlign: 'left', color: 'white'}}>Craftsmanship with a Soul</h2>
            <p style={{color: 'white', opacity: 0.9}}>Every piece in our haven is born from the hands of independent artisans. We believe in furniture that tells a story, using sustainable materials and time-honored techniques.</p>
          </div>
          <div className={styles.actionContent}>
            <p style={{marginBottom: '1rem', fontWeight: '500', color: 'white'}}>Want to see the process?</p>
            <Link href="/about_us" className={styles.buttonSecondary}>
              Our Story
            </Link>
          </div>
        </div>
      </div>

    </main>
  );
}