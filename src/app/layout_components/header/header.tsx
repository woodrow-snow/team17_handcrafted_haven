import Image from "next/image";
import styles from "./header.module.css"
import Link from "next/link";
import Nav from "./nav";
import LoginButton from "./login";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.siteInfo}>
                {/* Logo */}
                <Image
                    src="/images/hch_logo.svg"
                    alt="Handcrafted Haven Logo"
                    width={100}
                    height={100}
                    loading="eager"
                />
                {/* Site Name / Title */}
                <Link href="/" className={styles.siteName}>
                    <span>Handcrafted Haven</span>
                </Link>
            </div>
            {/* Navigation */}
            <Nav />
            {/* login button */}
            <LoginButton />
        </header>
    );
}