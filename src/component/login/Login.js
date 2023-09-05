import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  const navigate=useNavigate()
  const handleLogin = () => {
    // Check username and password
    if (username === "hudson" && password === "hudsontech") {
      setIsLoggedIn(true);
      setTimeout(()=>{
        navigate("/admin",{state:{password:password}})
      },1000)
      
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <p>Welcome, {username}!</p>
      ) : (
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          /><br/>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Login;
