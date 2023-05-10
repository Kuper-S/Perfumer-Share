import React , {useState} from 'react';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../state/actions/authAction';
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";
import { MDBIcon} from 'mdbreact';
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
}
from 'mdb-react-ui-kit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const genderOptions = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'nonbinary', label: 'Non-binary' },
];

function SingupPage() {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    gender: '',
    }
    
  );
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.gender) {
      alert('Please select a gender');
      return;
    }
    try {
      await dispatch(registerUser(formData));
      toast.success('Registration successful!', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        gender: '',
      });
      console.log(formData);
      window.location.href = '/'; // navigate to home page
    } catch (error) {
      console.error(error);
      setFormData({}); // clear form
      toast.error('Registration failed. Please try again.');
    }
    
  };
  



  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden'>
    <MDBRow>
    <ToastContainer />
      <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
        <h1 className="my-5 display-3 fw-bold ls-tight px-3" style={{color: 'hsl(320, 81%, 75%)'}}>
          ScentShare <br />
          <span style={{color: 'hsl(280, 81%, 75%)'}}>for scents lovers</span>
        </h1>
        <p className='px-3' style={{color: 'indigo'}}>
          Welcome to Scent Share, the ultimate destination for fragrance lovers! We believe that every scent has a story to tell, and we're here to help you discover yours. Whether you're looking for your signature scent, or simply want to explore new fragrances, our community of scent enthusiasts is here to guide you.
        </p>
      </MDBCol>
      <MDBCol md='6' className='position-relative'>
        <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
        <div id="radius-shape-2" className="position-absolute shadow-5-strong"></div>
        <MDBCard className='my-5 bg-glass'>
          <MDBCardBody className='p-5'>
            <form onSubmit={handleSubmit}>
              <MDBRow>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='First name' id='form1' type='text' name='firstName' value={formData.firstName} onChange={handleInputChange} required/>
                </MDBCol>
                <MDBCol col='6'>
                  <MDBInput wrapperClass='mb-4' label='Last name' id='form2' type='text' name='lastName' value={formData.lastName} onChange={handleInputChange} required/>
                </MDBCol>
              </MDBRow>
              <MDBInput wrapperClass='mb-4' label='Email' id='form3' type='email' name='email' value={formData.email} onChange={handleInputChange} required/>
              <MDBInput wrapperClass='mb-4' label='Password' id='form4' type='password' name='password' value={formData.password} onChange={handleInputChange} required/>
              <MDBContainer fluid>
                <div className='mb-4'>
                  <label htmlFor='gender' className='form-label'>Gender</label>
                  <select id='gender' className='form-select' name='gender' value={formData.gender} onChange={handleInputChange} required>
                    <option value='' disabled>Select gender</option>
                    {genderOptions.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              </MDBContainer>
              <MDBBtn className='w-100 mb-4' size='md' color="indigo" style={{backgroundColor: 'rgb(85, 0, 128)'}} type="submit">sign up</MDBBtn>
            </form>
            <div className="text-center">
              <p>or sign up with:</p>
                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: 'indigo' }}>
                  <MDBIcon fab icon='google' size="md"/>
                </MDBBtn>
              </div>
            </MDBCardBody>
          
          </MDBCard>

        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default SingupPage;