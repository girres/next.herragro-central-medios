// Services
import { getPosts } from '@/services/strapi';

// Components.
import AllEntries from '@/components/Blog/AllEntries';

// Revalidate time for the page // 10 minutes
export const revalidate = 600;

export default async function Page() {
  const posts = await getPosts();

  return (
    <main className='main-content'>
      <div className='container py-20'>
        <AllEntries posts={posts} />
      </div>
    </main>
  );
}
