
import nextApi from '@/helpers/nextApi';
import styles from './styles.module.css';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

async function updatePost(formData: FormData) {
    'use server';
    const id = formData.get('id');
    const title = formData.get('title');
    const body = formData.get('body');

    await nextApi.put(`/posts/${id}`, { title, body });
    revalidatePath(`/posts/${id}`);
}

async function deletePost(formData: FormData) {
    'use server';
    const id = formData.get('id');

    await nextApi.delete(`/posts/${id}`);
    redirect('/');
}

async function getPost(id: string) {
    'use server';
    const response = await nextApi.get(`/posts/${id}`);
    
    return response.data;
}

export default async function Post({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await getPost(id);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <>
        <div className={styles.controls}>

            <form action={deletePost}>
                <input type="hidden" name="id" value={post.id} />
                <button type="submit" className={styles.deleteSubmit}>
                    Delete Post
                </button>
            </form>

            <form action={updatePost}>
                <input type="hidden" name="id" value={post.id} />
                <div className={styles.section}>
                    <label htmlFor="title">Title</label>
                    <input
                        id="title"
                        name="title"
                        type="text"
                        defaultValue={post.title}
                        required
                    />
                </div>
                <div className={styles.section}>
                    <label htmlFor="body">Body</label>
                    <textarea
                        id="body"
                        name="body"
                        defaultValue={post.body}
                        required
                    />
                </div>
                <button type="submit" className={styles.editSubmit}>
                    Save Changes
                </button>
            </form>
        </div>
    </>
  );
}