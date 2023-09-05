import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Home.css'
import { useLocation, useNavigate } from 'react-router-dom';

const Home = () => {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate()
  const location = useLocation()

  console.log(location.state)

useEffect(()=>{
  if(location?.state===null){
    navigate('/')
}

},[location])
  useEffect(() => {
    // Fetch user data from the server
    axios.post('http://localhost:8000/login/user')  // Update with your server endpoint
      .then(response => {
        setUserData(response.data);
        console.log(response)
      })
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  return (
    <div>
    <h1>User Data</h1>
    <table className="user-table">
      <thead>
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>File Link</th>
        </tr>
      </thead>
      <tbody>
        {userData.map(user => (
          <tr key={user._id}>
            <td>{user.firstname}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>
              {user.pdf && (
                <a href={user.pdf} target="_blank" rel="noopener noreferrer">
                  View File
                </a>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>

  );
};

export default Home;
