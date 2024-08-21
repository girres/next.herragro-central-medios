import Link from 'next/link';
import Post from '@/components/Blog/Post';

const Component = ({ posts = [] }) => {
  if (posts.length < 1) {
    return null;
  }

  return (
    <div className='block-promoted'>
      <div className='mb-10 flex items-center justify-between'>
        <div className='uppercase'>
          <h2>Blog</h2>
          <p className='text-gray-500 text-xs'>Últimos posts</p>
        </div>
        <div>
          <Link href='/blog' className='btn-yellow'>
            Ver todos los posts
          </Link>
        </div>
      </div>
      <div className='post-items'>
        {posts.map((post, index) => (
          <Post key={post.id} data={post} reverse={index % 2} />
        ))}
      </div>
    </div>
  );
};

export default Component;
