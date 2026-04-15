import styles from './skeletons.module.css';

export function ProductCardSkeleton() {
  return (
    <div className={styles.skeletonCard}>
      <div className={styles.shimmerWrapper}>
        <div className={styles.shimmer} />
      </div>
      <div className={styles.skeletonImage} />
      <div className={styles.skeletonBody}>
        <div className={styles.skeletonTitleRow}>
          <div className={styles.skeletonName} />
          <div className={styles.skeletonPrice} />
        </div>
        <div className={styles.skeletonText} />
        <div className={styles.skeletonButton} />
      </div>
    </div>
  );
}

export function ShopGridSkeleton() {
  return (
    <div className={styles.grid}>
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
      <ProductCardSkeleton />
    </div>
  );
}