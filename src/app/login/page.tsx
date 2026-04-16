import Image from "next/image";
import styles from "./login.module.css";
import { Metadata } from "next";
import LoginForm from './components/login_form';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Login',
};

export default function Login() {
    return (
        <div className={styles.loginContainer}>
            <h1 className={styles.h1}>Have an account? Login Here!</h1>
            
            <LoginForm />
            
            <p className={styles.signupText}>
                Don't have an account?{' '}
                <Link href="/account/add" className={styles.signupLink}>
                    Sign up here
                </Link>
            </p>
        </div>
    );
}