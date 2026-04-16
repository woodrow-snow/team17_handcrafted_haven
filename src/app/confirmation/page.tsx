import Link from "next/link";
import styles from "./confirmation.module.css";

export default function ConfirmationPage() {
  return (
    <div className={styles.page}>
      <div className={styles.card}>
        <h1 className={styles.title}>Thank You for Your Purchase!</h1>

        <p className={styles.message}>
          Your order has been received. You will receive further details and
          shipping updates at your email address.
        </p>

        <Link href="/shop" className={styles.button}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
}
