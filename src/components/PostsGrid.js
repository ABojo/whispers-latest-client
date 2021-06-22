import { useEffect, useState } from 'react';
import API from '../utils/API';

function PostsGrid() {
  const [posts, setPosts] = useState('');

  const getPosts = async () => {
    const json = await API.getLatest();
    console.log(json);
    setPosts(json.data.latestPosts);
  };

  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div className="post-grid">
      {posts &&
        posts.map((post) => {
          return <img src={post.url}></img>;
        })}
    </div>
  );
}

export default PostsGrid;
