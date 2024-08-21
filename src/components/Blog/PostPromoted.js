import Post from '@/components/Blog/Post';

const Component = ({ posts = [] }) => {
  if (posts.length < 1) {
    return null;
  }

  return (
    <div className='block-promoted'>
      <div className='mb-10 uppercase'>
        <h2 className='fontExtraB'>Blog</h2>
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
