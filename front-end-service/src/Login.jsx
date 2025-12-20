import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/login.css';
import './assets/Designer.jpeg';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if(email==='admin' || password ==='admin123'){

      navigate("/admin");

    }
    else{
    try {
      const response = await fetch('http://localhost:8082/HCS/patient/patient/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
  
      if (response.ok) {
        const patient = await response.json();
  
        localStorage.setItem("loggedPatient", JSON.stringify(patient));

        navigate("/profile");
        window.location.reload();

      } else {
        setError("Invalid email or password");
      }
  
    } catch (err) {
      console.error("Login failed:", err);
      setError("Something went wrong. Please try again.");
    }
  };
}

  return (
  
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
              <p className="signup-link">Don't have an account? <Link to="/signup">Sign Up</Link></p>
            </form>
          </div>
        </div>
      </div>

  );
}

export default Login;
