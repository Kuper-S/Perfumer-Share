import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePostAction, updatePostAction } from '../../state/actions/postAction';

const SinglePost = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleEditPost = () => {
    setIsEditing(true);
    dispatch(updatePostAction(post._id));
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.body}</p>
        <p className="card-text">
          <small className="text-muted">Posted by: {post.postedBy.firstName}</small>
        </p>
      </div>
      {user && user.id === post.postedBy.id && (
        <div className="card-footer">
          <div className="btn-group">
            <button className="btn btn-primary mr-2" onClick={handleEditPost} disabled={isEditing}>
              {isEditing ? 'Editing...' : 'Edit'}
            </button>
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
