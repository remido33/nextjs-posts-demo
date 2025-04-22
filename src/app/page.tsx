import Link from 'next/link';
import styles from './style.module.css';
import nextApi from '@/helpers/nextApi';

async function getPosts() {
    'use server';
    
    const response = await nextApi.get('/posts');
    return response.data;
}

export default async function Home() {
    const posts = await getPosts();

    return (
        <div>
            <ul className={styles.posts}>
                {posts.map((post: any) => (
                    <li key={post.id}>
                        <p>
                            {post.title}
                        </p>
                        <Link href={`/post/${post.id}`}>
                            Read more
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}