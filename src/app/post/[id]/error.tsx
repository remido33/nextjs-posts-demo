'use client';
 
import { useEffect } from 'react';
import styles from './styles.module.css';
 
export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {

    const getErrorMessage = () => {
        if(error.message.includes('404')) {
            return 'The requested resource was not found.';
        }
        if (error.digest) {
            return `An unexpected error occurred (ID: ${error.digest}).`;
        }
        return 'Something went wrong. Please try again.';
    };

    useEffect(() => {
        // For error log service
    }, [error])
 
    return (
        <div className={styles.wrapper}>
            <h1>Error</h1>
            <p>{getErrorMessage()}</p>
        </div>
    )
}