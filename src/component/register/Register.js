import React, { useState } from 'react'
import "./Register.css"
import { Toaster, toast } from 'react-hot-toast'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
  const navigate = useNavigate()
  const [userRegister, setUserRegister] = useState({
    firstname: "",
    lastname: "",
    email: "",
    mobile: "",
    gender: "",
    age: "",
    password: "",
    pdf: "",
    confirmpassword: ""

  })

  const handleChange = (e) => {
    setUserRegister((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleFileChange = (e) => {
    setUserRegister((prevData) => ({ ...prevData, pdf: e.target.files[0] }));
    const file = e.target.files[0];
    const fileType = file.type.split('/');
    if (fileType[1] === 'pdf' || fileType[1] === 'xml' || fileType[1] === 'docx' || fileType[1] === 'jpeg' || fileType[1] === 'png') {
      if (file.size < 10485760) {
        console.log(file);
      }
    } else {
      toast.error('File format not supported');
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (userRegister.confirmpassword !== userRegister.password) {
      toast.error('Passwords do not match');
      return;
    }

    for (const field of ['email', 'password', 'age', 'firstName', 'lastName', 'gender', 'mobile']) {
      if (userRegister[field] === '') {
        toast.error(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return;
      }
    }

    if (userRegister.pdf === null) {
      toast.error('PDF is required');
      return;
    }

    const formData = new FormData();
    for (const field in userRegister) {
      formData.append(field, userRegister[field]);
    }

    try {
      const res = await axios.post('https://hudson-backend.onrender.com/register/user', formData);

      if (res.data.status === 1) {
        toast.success(res.data.message);
        localStorage.setItem('token', res.data.token);
        setTimeout(() => {
          navigate('/thank');
        }, 3000);
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Error submitting form.');
    }
  };

  return (
    <>
      <div className="registration-container">
        <h1>Registration Form</h1>
        <form onSubmit={handleSubmit}>
          <label for="firstName">First Name</label>
          <input type="text" name="firstname" onChange={(e) => handleChange(e)} />

          <label for="lastName">Last Name</label>
          <input type="text" name="lastname" onChange={(e) => handleChange(e)} />

          <label for="email">Gmail</label>
          <input type="email" name="email" onChange={(e) => handleChange(e)} />

          <label for="phone">Phone</label>
          <input type="tel" name="mobile" onChange={(e) => handleChange(e)} />

          <label for="gender">Gender</label>
          <select name="gender" onChange={(e) => handleChange(e)}>
            <option value=""></option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>

          <label for="age">Age</label>
          <input type="number" name="age" onChange={(e) => handleChange(e)} />

          <label for="password">Password</label>
          <input type="password" name="password" onChange={(e) => handleChange(e)} />

          <label for="confirmPassword">Confirm Password</label>
          <input type="password" name="confirmpassword" onChange={(e) => handleChange(e)} />

          <label for="pdf">File Attachment</label>
          <input type="file" name="pdf" onChange={(e) => handleFileChange(e)} />

          <button type="submit" >Register</button>
        </form>
      </div>
      <Link to='/login'>
        <button className='admin'>Admin Login</button>
      </Link >




      <Toaster />

    </>
  )
}

export default Register