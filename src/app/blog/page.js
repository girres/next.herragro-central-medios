// Services
import { getPosts } from '@/services/strapi';

// Components.
import AllEntries from '@/components/Blog/AllEntries';

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
