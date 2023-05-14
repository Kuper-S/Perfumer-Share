import React, { useState ,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBIcon} from 'mdbreact';
import {
  MDBContainer,
  MDBInput,
  MDBCheckbox,
  MDBBtn
}
from 'mdb-react-ui-kit';

import { loginStart, loginSuccess, loginFailure } from '../../state/reducers/authReducer';


function LoginPage() {
 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  

  useEffect(() => {
    console.log('Email:', email, 'Password:', password);
    
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    
    console.log('Before login API call'); // Debugging statement
    
    try {
      const response = await api.auth.login(email, password);
      
      console.log('Response:', response); // Debugging statement
      console.log('ResponseData:', response.data); // Logging the response data
      
      dispatch(loginSuccess(response));
      localStorage.setItem('token', response.token);
      navigate('/');
    } catch (error) {
      dispatch(loginFailure(error.message));
    }
  };
  
  
  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <form onSubmit={handleSubmit}>
        <MDBInput wrapperClass='mb-4' label='Email address' id='form1' type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <MDBInput wrapperClass='mb-4' label='Password' id='form2' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </form>      
      <MDBIcon icon="wind" size="4x" />
      <div className="d-flex justify-content-between mx-3 mb-4">
        <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Remember me' />
        <a href="!#">Forgot password?</a>
      </div>

      <MDBBtn className="mb-4" type="submit" onClick={handleSubmit}>Sign in</MDBBtn>

      <div className="text-center">
        <p>Not a member? <a href="signup">Register</a></p>
        <p>or sign up with:</p>

        <div className='d-flex justify-content-between mx-auto' style={{ width: '40%' }}>
          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='facebook-f' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='twitter' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='google' size="sm" />
          </MDBBtn>

          <MDBBtn tag='a' color='none' className='m-1' style={{ color: '#1266f1' }}>
            <MDBIcon fab icon='github' size="sm" />
          </MDBBtn>
        </div>
      </div>
    </MDBContainer>
  );
}

export default LoginPage;
