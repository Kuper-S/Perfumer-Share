import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deletePostAction } from '../../state/actions/postAction';

const SinglePost = ({ post }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.user);

  const handleDelete = () => {
    dispatch(deletePostAction(post._id));
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
            <button className="btn btn-primary mr-2">Edit</button>
            <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SinglePost;
