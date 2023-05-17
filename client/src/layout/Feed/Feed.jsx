import React,{useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsAction } from '../../state/actions/postAction';

import PostInput from '../../components/Post/PostInput';
import PostLists from '../../components/Post/PostLists';

const Feed = () => {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(getPostsAction());
    }, [dispatch]);
  
    const loading = useSelector((state) => state.post.loading);
  
    return (
      <div className="feed">
        <h2>Feed</h2>
        <PostInput />
        {loading ? (
          <p>Loading...</p>
        ) : (
          <PostLists />
        )}
      </div>
    );
  };
  
  export default Feed;
  