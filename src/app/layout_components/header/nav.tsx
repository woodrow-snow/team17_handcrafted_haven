import Link from "next/link";
import styles from "@/app/layout_components/header/header.module.css"

export default function Nav() {
    return (
        <nav className={styles.navigation}>
            <Link href="/">Home</Link>
            <Link href="/about_us">About</Link>
            <Link href="/Shop">Shop</Link>
        </nav>
    );
}