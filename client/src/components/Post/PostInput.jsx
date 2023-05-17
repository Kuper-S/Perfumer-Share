import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostAction } from '../../state/actions/postAction';

const PostInput = () => {
  const [postContent, setPostContent] = useState('');
  const dispatch = useDispatch();

  const handleChange = (event) => {
    setPostContent(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (postContent.trim() === '') {
      return; // Prevent submitting empty posts
    }
    
    const postData = {
      title: postContent, // Add the title property
      body: postContent, // Assuming body is the same as the content
    };
    
    dispatch(createPostAction(postData));
    setPostContent('');
  };

  return (
    <div className="post-input">
      <form onSubmit={handleSubmit}>
        <textarea
          className="form-control"
          value={postContent}
          onChange={handleChange}
          placeholder="What's on your mind?"
        />
        <button className="btn btn-primary mt-3" type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostInput;
