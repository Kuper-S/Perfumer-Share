import React from 'react'
import { useSelector, useDispatch } from 'react-redux';


function HomePage() {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  console.log("HomePage isAuthenticated:", isAuthenticated);
  return (
    <div>HomePage</div>
  )
}

export default HomePage