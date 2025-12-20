import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Styles/login.css';

function DoctorLogin(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    
  const handleLogin = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch('http://localhost:8081/HCS/doctor/doctor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      if (response.ok) {
        const doctor = await response.json();
  
        localStorage.setItem("loggedDoctor", JSON.stringify(doctor));

        navigate("/Dappointments");
        window.location.reload();

      } else {
        setError("Invalid email or password");
      }
  
    } catch (err) {
      console.error("Login failed:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  return(

    <div className="login-container">
        <div className="login-box">
          <div className="login-form">
            <h2>Welcome back to MedConnect!</h2>
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
              <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
              <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              <button type="submit">Login</button>
              {error && <p className="error-message">{error}</p>}
              <p className="signup-link">Don't have an account? Want to register Email us medConnect@gmail.com</p>
            </form>
          </div>
        </div>
      </div>

  );
  
};

export default DoctorLogin;
