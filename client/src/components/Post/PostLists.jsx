import React from 'react';
import { useSelector } from 'react-redux';
import SinglePost from './SinglePost';

const PostList = () => {
  const posts = useSelector((state) => state.post.posts);

  return (
    <div>
      {posts.map((post) => (
        <SinglePost key={post._id} post={post} />
      ))}
    </div>
  );
};

export default PostList;