'use server';

import { signIn } from '@/auth';
import { AuthError } from 'next-auth';
import bcrypt from 'bcryptjs';
import { sql } from '@vercel/postgres';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function authenticate(
    prevState: string | undefined,
    formData: FormData,
) {
    try {
        await signIn('credentials', formData);
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return 'Invalid credentials.';
                default:
                    return 'Something went wrong.';
            }
        }
        throw error;
    }
}

export async function register(prevState: string | undefined, formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('password') as string;
        const role = formData.get('role') as string || 'customer';

        // Hash the password before saving to DB
        const hashedPassword = await bcrypt.hash(password, 10);

        await sql`
            INSERT INTO users (name, email, password, role)
            VALUES (${name}, ${email}, ${hashedPassword}, ${role})
        `;

    } catch (error: any) {
        if (error.code === '23505') {
            return 'Email already exists.';
        }
        console.error('Registration Error:', error);
        return 'Failed to create account.';
    }

    redirect('/login');
}

export async function createProduct(prevState: string | undefined, formData: FormData) {
    try {
        const name = formData.get('name') as string;
        const description = formData.get('description') as string;
        const price = parseFloat(formData.get('price') as string);
        const image_url = formData.get('image_url') as string || 'https://placehold.co/400x400';
        
        const categoryInput = formData.get('category') as string;
        const category = categoryInput?.trim() ? categoryInput : 'Others';

        // Temporary hardcoded seller_id (Link this to your auth session later)
        // Ensure this ID actually exists in your 'users' table or the query will fail
        const seller_id = '13d07535-c59e-4157-a30f-f4193e413865'; 

        await sql`
            INSERT INTO products (seller_id, name, description, price, category, image_url)
            VALUES (${seller_id}, ${name}, ${description}, ${price}, ${category}, ${image_url})
        `;

    } catch (error) {
        console.error('Database Error:', error);
        return 'Database Error: Failed to Create Product. Check if your seller_id is valid.';
    }

    revalidatePath('/shop');
    redirect('/shop');
}