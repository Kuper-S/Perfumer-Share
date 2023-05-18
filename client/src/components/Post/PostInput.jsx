import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPostAction } from '../../state/actions/postAction';

const PostInput = () => {
  const [postContent, setPostContent] = useState({ title: '', body: '', perfumeName: '' });
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPostContent((prevContent) => ({
      ...prevContent,
      [name]: value
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (postContent.title.trim() === '' || postContent.body.trim() === '' || postContent.perfumeName.trim() === '') {
      return; // Prevent submitting empty posts
    }

    const postData = {
      title: postContent.title,
      body: postContent.body,
      perfumeName: postContent.perfumeName
    };

    dispatch(createPostAction(postData));
    setPostContent({ title: '', body: '', perfumeName: '' });
  };

  return (
    <div className="post-input">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          className="form-control mb-2"
          placeholder="Title"
          value={postContent.title}
          onChange={handleChange}
        />
        <textarea
          name="body"
          className="form-control mb-2"
          placeholder="What's on your mind?"
          value={postContent.body}
          onChange={handleChange}
        />
        <input
          type="text"
          name="perfumeName"
          className="form-control mb-2"
          placeholder="Perfume Name"
          value={postContent.perfumeName}
          onChange={handleChange}
        />
        <button className="btn btn-primary mt-3" type="submit">Post</button>
      </form>
    </div>
  );
};

export default PostInput;
