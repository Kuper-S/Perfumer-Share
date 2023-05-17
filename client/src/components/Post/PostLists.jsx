import React,{useState} from 'react';
import { useSelector } from 'react-redux';
import SinglePost from './SinglePost';

const PostList = () => {
  const posts = useSelector((state) => state.post.posts);
  const [editPostId, setEditPostId] = useState(null);

  const handleEditPost = (postId) => {
    setEditPostId(postId);
  };

  const handleCancelEdit = () => {
    setEditPostId(null);
  };

  const handleSavePost = (postId, updatedContent) => {
    // Dispatch an action to update the post with the new content
    // Reset the edit state by setting editPostId to null
  };

  return (
    <div>
      {posts.map((post) => (
        <SinglePost
          key={post._id}
          post={post}
          isEditing={editPostId === post._id}
          onEdit={handleEditPost}
          onCancelEdit={handleCancelEdit}
          onSave={handleSavePost}
        />
      ))}
    </div>
  );
};

export default PostList;