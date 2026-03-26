import Image from "next/image";
import styles from "./header.module.css"
import Link from "next/link";

export default function Header() {
    return (
        <header className={styles.header}>
            <Image
                src="/images/hch_logo.svg"
                alt="Handcrafted Haven Logo"
                width={100}
                height={100}
                loading="eager"
            />

            <Link href="/" className={styles.siteName}>
                <span>Handcrafted Haven</span>
            </Link>
            
        </header>
    );
}