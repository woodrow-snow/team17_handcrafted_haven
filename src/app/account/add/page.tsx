import RegisterForm from './components/register_form';
import styles from '@/app/login/login.module.css';

export default function AddAccountPage() {
    return (
        <main style={{ padding: '2rem', textAlign: 'center' }}>
            <h1 className={styles.h1}>Create Your Account</h1>
            <p>Join Handcrafted Haven today!</p>
            
            <div style={{ maxWidth: '400px', margin: '0 auto' }}>
                <RegisterForm />
            </div>
        </main>
    );
}