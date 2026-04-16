'use client';

import { useActionState } from 'react';
import { register } from '@/lib/actions';
import styles from '@/app/login/login.module.css';

export default function RegisterForm() {
    const [errorMessage, dispatch, isPending] = useActionState(register, undefined);

    return (
        <form action={dispatch} className={styles.loginForm}>
            <div className={styles.inputArea}>
                <label htmlFor="name">Full Name</label>
                <input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.inputArea}>
                <label htmlFor="email">Email</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="email@example.com"
                    required
                    className={styles.input}
                />
            </div>

            <div className={styles.inputArea}>
                <label htmlFor="password">Password</label>
                <input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="At least 6 characters"
                    required
                    minLength={6}
                    className={styles.input}
                />
            </div>

            <div className={styles.inputArea}>
                <label htmlFor="role">Account Type</label>
                <select id="role" name="role" className={styles.input} defaultValue="customer">
                    <option value="customer">Customer (I want to buy)</option>
                    <option value="seller">Seller (I want to sell)</option>
                </select>
            </div>

            <button 
                type="submit" 
                disabled={isPending} 
                className={styles.login}
                style={{ marginTop: '20px' }}
            >
                {isPending ? 'Creating Account...' : 'Sign Up'}
            </button>

            {errorMessage && (
                <p style={{ color: 'red', marginTop: '10px' }}>{errorMessage}</p>
            )}
        </form>
    );
}