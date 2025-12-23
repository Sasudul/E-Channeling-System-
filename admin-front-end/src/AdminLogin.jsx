import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Styles/login.css';


function AdminLogin(){

    const [userName,setUserName] = useState('');
    const [password,setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async(e) =>{
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:8085/HCS/Admin/login', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ userName, password })
            });
        
            if (response.ok) {

              navigate("/admin");
              window.location.reload();
      
            } else {
              setError("Invalid email or password");
            }
        
          } catch (err) {
            console.error("Login failed:", err);
            setError("Something went wrong. Please try again.");
          }

    }
     
    

      return(
        <div className="login-container">
        <div className="login-box">
          <div className="login-form">
            <h2>Welcome back to Admin!</h2>
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
              <input type="text" placeholder="Email Address" value={userName} onChange={(e) => setUserName(e.target.value)} required/>
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
              {error && <p className="error-message">{error}</p>}
              <button type="submit">Login</button>
            </form>
          </div>
        </div>
      </div>
      );

}

export default AdminLogin