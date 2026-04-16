"use client"

import Image from "next/image";
import styles from "../login.module.css";
import { useState, useActionState } from "react";
import { useFormStatus } from 'react-dom';
import { authenticate } from '@/lib/actions';

export default function LoginForm() {
    const [errorMessage, dispatch] = useActionState(authenticate, undefined);
    
    const [showPassword, setShowPassword] = useState(false);

    const togglePassword = () => {
        setShowPassword(!showPassword);
    };

    return (
        <form action={dispatch} className={styles.loginForm}>
            {/* VVVVV Email Field VVVVV */}
            <label className={styles.inputArea} htmlFor="email">
                Email:
                <input
                    className={styles.input}
                    id="email"
                    type="email"
                    name="email"
                    placeholder="email@example.com"
                    required
                />
            </label>

            <div className={styles.passwordField}>
                <label className={styles.inputArea} htmlFor="password">
                    Password:
                    <input
                        className={styles.input}
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        placeholder="password here"
                        required
                        minLength={6}
                    />
                </label>
                <Image
                    height={32}
                    width={40}
                    src={showPassword ? "/images/login/eye-slash.svg" : "/images/login/eye.svg"}
                    alt="show password button"
                    id="eyeSVG"
                    onClick={togglePassword}
                    style={{ cursor: 'pointer' }}
                />
            </div>

            <LoginButton />

            {errorMessage && (
                <div className={styles.errorText} style={{ color: 'red', marginTop: '10px' }}>
                    <p>{errorMessage}</p>
                </div>
            )}
        </form>
    );
}

function LoginButton() {
    const { pending } = useFormStatus();

    return (
        <input
            type="submit"
            value={pending ? "Logging in..." : "Log in"}
            id="login"
            className={styles.login}
            disabled={pending} 
        />
    );
}