import styles from "./page.module.css";
import Link from 'next/link';

export default function Home() {
  return (
    <main className={styles.main}>
      
      {/* HERO SECTION */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Interested?</h1>
          <p style={{color: 'var(--secondary-color)', marginBottom: '2rem', opacity: 0.9}}>
            Lorem ipsum dolor sit amet.
          </p>
          <Link href="/shop" className={styles.button}>
            Shop Now
          </Link>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <div className={styles.sectionWrapper}>
        <h2 className={styles.sectionHeading}>Featured Collection</h2>
        <div className={styles.productGrid}>
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className={styles.productCard}>
               {/* Later, put <Image /> here from Chapter 3 */}
            </div>
          ))}
        </div>
      </div>

      {/* GET TO KNOW US */}
      <div className={styles.sectionWrapper}>
        <div className={styles.splitLayout}>
          <div className={styles.textContent}>
            <h2 className={styles.sectionHeading} style={{textAlign: 'left'}}>Get to Know Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus dolorum voluptate hic? Porro, aliquam. Quod laudantium dolore tenetur earum!</p>
          </div>
          <div className={styles.actionContent}>
            <p style={{marginBottom: '1rem', fontWeight: '500'}}>Lorem ipsum dolor sit amet?</p>
            <Link href="/about_us" className={styles.button}>
              Read More
            </Link>
          </div>
        </div>
      </div>

      {/* REVIEWS */}
      <div className={styles.sectionWrapper} style={{textAlign: 'center', paddingBottom: '5rem'}}>
        <h2 className={styles.sectionHeading}>Reviews</h2>
        <div style={{fontStyle: 'italic', color: 'var(--primary-color)', opacity: 0.7}}>
          "lorem ipsum dolor sit amet consectetur adipisicing elit."
        </div>
      </div>

    </main>
  );
}