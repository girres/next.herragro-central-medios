import Link from 'next/link';

// Components
import Post from '@/components/Blog/Post';

const Component = ({ posts = [] }) => {
  if (posts.length < 1) {
    return null;
  }

  return (
    <div className='block-posts-all'>
      <div className='mb-10'>
        <div className='breadcrumbs text-xs text-gray-500'>
          <ul>
            <li>
              <Link href='/'>Inicio</Link>
            </li>
            <li>Blog</li>
          </ul>
        </div>
        <div className='uppercase'>
          <h1>Blog</h1>
          <p className='text-gray-500 text-xs'>Todos los posts</p>
        </div>
      </div>
      <div className='post-items space-y-5'>
        {posts.map((post, index) => (
          <Post key={post.id} data={post} reverse={index % 2} />
        ))}
      </div>
    </div>
  );
};

export default Component;
