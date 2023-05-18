import React ,{useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux';
import {getUserAction} from "../../state/actions/userAction"
import Feed from "../../layout/Feed/Feed";
function HomePage() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuthStatusAction());
  }, []);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  

  // Access the first name from the response data

  console.log("HomePage isAuthenticated:", isAuthenticated);

  return (
    <div>
      <Feed/>
    </div>
  );
}

export default HomePage;

