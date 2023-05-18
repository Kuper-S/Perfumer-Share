import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePostAction, updatePostAction } from '../../state/actions/postAction';

const SinglePost = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [postContent, setPostContent] = useState({
    title: post.title,
    body: post.body,
    perfumeName: post.perfumeName
  });

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
      dispatch(deletePostAction(post._id));
    } catch (error) {
      // Handle error, show error message, etc.
      console.error(error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEditPost = async () => {
    setIsEditing(true);
    try {
      await dispatch(updatePostAction(post._id, {
        title: postContent.title,
        body: postContent.body,
        perfumeName: postContent.perfumeName
      }));
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      setIsEditing(false);
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostContent((prevContent) => ({
      ...prevContent,
      [name]: value
    }));
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        {isEditing ? (
          <>
            <input
              type="text"
              name="title"
              className="form-control mb-2"
              value={postContent.title}
              onChange={handleInputChange}
            />
            <textarea
              name="body"
              className="form-control"
              value={postContent.body}
              onChange={handleInputChange}
            ></textarea>
            <input
              type="text"
              name="perfumeName"
              className="form-control mt-2"
              value={postContent.perfumeName}
              onChange={handleInputChange}
            />
          </>
        ) : (
          <>
            <h1 className="card-text">{post.title}</h1>
            <p className="card-text">{post.body}</p>
            <p className="card-text">{post.perfumeName}</p>
          </>
        )}
        <p className="card-text">
          <small className="text-muted">Posted by: {post.postedBy.firstName}</small>
        </p>
      </div>
      {user && user.id === post.postedBy.id && (
        <div className="card-footer">
          <div className="btn-group">
            {isEditing ? (
              <button className="btn btn-primary mr-2" onClick={handleEditPost} disabled={isDeleting}>
                {isEditing ? 'Save' : 'Edit'}
              </button>
            ) : (
              <button className="btn btn-primary mr-2" onClick={() => setIsEditing(true)}>
                Edit
              </button>
            )}
            <button className="btn btn-danger" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                'Delete'
              )}
            </button>
          </div>
        </div>
      
      )}
    </div>
  );
};

export default SinglePost;
