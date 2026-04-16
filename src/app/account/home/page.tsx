import styles from "./account_home.module.css";
import Link from "next/link";
import { auth } from "../../../auth";

export default async function Home() {
    const session = await auth();
    const user = session?.user;

    const isSeller = user?.role === 'seller';

    return (
        <div className={styles.all}>
            <h1>Welcome back, {user?.name || 'User'}!</h1>
            <p className={styles.question}>What would you like to do?</p>
            
            <ul className={styles.ul}>
                {/* Only Sellers see this */}
                {isSeller && (
                    <li>
                        <Link href="/account/add/">Add a product to sell</Link>
                    </li>
                )}

                <li><Link href="/shop">Browse the Catalog</Link></li>
                <li><Link href="/account/orders">View My Reviews</Link></li>
                
                {/* If they aren't a seller, maybe give them an invite link */}
                {!isSeller && (
                    <li><Link href="/account/become-seller">Apply to become an Artisan</Link></li>
                )}
            </ul>
        </div>
    );
}