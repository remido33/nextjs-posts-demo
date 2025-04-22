
import Link from 'next/link';
import styles from './styles.module.css';

export default async function PostLayout({ children }: { children: React.ReactNode }) {

    return (
        <div className={styles.wrapper}>
            <Link className={styles.goBack} href='/'>
                Go Home
            </Link>
            <div className={styles.content}>
                {children}
            </div>
        </div>
    );
}