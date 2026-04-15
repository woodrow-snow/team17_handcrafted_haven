'use client';

import Image from "next/image";
import styles from "./header.module.css"
import Link from "next/link";
import Nav from "./nav";
import LoginButton from "./login";
import Hamburger from "./hamburger";
import { useState, useEffect } from "react";

export default function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [isPop, setIsPop] = useState(false);

    // Function to calculate total items from localStorage
    const updateCartCount = () => {
        const cart = JSON.parse(localStorage.getItem("cart") || "[]");
        const total = cart.reduce((acc: number, item: any) => acc + item.quantity, 0);
        
        if (total !== cartCount) {
            setCartCount(total);
            setIsPop(true);
            setTimeout(() => setIsPop(false), 300);
        }
    };

    useEffect(() => {
        updateCartCount(); // Initial load
        window.addEventListener("storage", updateCartCount);
        return () => window.removeEventListener("storage", updateCartCount);
    }, [cartCount]);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const CartBadge = () => (
        <Link href="/cart" className={`${styles.cartLink} ${isPop ? styles.pop : ""}`}>
            <span className={styles.cartIcon}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
            </span>
            <span className={styles.cartCount}>{cartCount}</span>
        </Link>
    );

    return (
        <>
            <header className={styles.header}>
                <div className={styles.siteInfo}>
                    <Image src="/images/hch_logo.svg" alt="Logo" width={50} height={50} priority className={styles.logo} />
                    <Link href="/" className={styles.siteName}>
                        <span>Handcrafted Haven</span>
                    </Link>
                </div>

                <div className={styles.desktopMenu}>
                    <Nav /> 
                </div>

                {/* login button */}
                <LoginButton />
                
                {/* Cart Badge */}
                <Link href="/cart" className={styles.cartLink}>
                    <span className={styles.cartIcon}>
                        <svg
                            width="22"
                            height="22"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        >
                            <circle cx="9" cy="21" r="1"></circle>
                            <circle cx="20" cy="21" r="1"></circle>
                            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                        </svg>
                    </span>
                    <span id="cart-count">0</span>
                </Link>

                {/* Hamburger button for Mobile menu */}
                <Hamburger toggleMenu={toggleMenu} />
            </header>

            <div className={`${styles.mobileMenu} ${isOpen ? styles.open : ""}`}>
                <Hamburger toggleMenu={toggleMenu} classes={`${styles.hamburger} ${styles.openMenu}`} />
                <Nav />
                <CartBadge />
            </div>
        </>
    );
}