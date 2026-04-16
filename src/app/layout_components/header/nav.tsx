"use client";

import NavLink from "./navLink";
import styles from "@/app/layout_components/header/header.module.css"

export default function Nav() {
    return (
        <nav className={styles.navigation}>
            <NavLink href="/">Home</NavLink>
            <NavLink href="/about_us">About</NavLink>
            <NavLink href="/shop">Shop</NavLink>
            <NavLink href="/seller/products">Seller Dashboard</NavLink>
        </nav>
    );
}