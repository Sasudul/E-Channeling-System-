import { useState } from 'react';
import { Link } from 'react-router-dom';
import './Styles/Signup.css';


function Signup(){

  const [patientName,setPatientName] = useState('');
  const [patientEmail,setPatientEmail] = useState('');
  const [patientDOB,setPatientDOB] = useState('');
  const [patientGender,setPatientGender] = useState('');
  const [patientPassword,setPatientPassword] = useState('');
  const [patientContact,setPatientContact] = useState('');
  const [patientAddress,setPatientAddress] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();

    const patient = {
     name :patientName ,
     dob : patientDOB,
     gender : patientGender,
     contactNumber: patientContact,
     email: patientEmail,
     password: patientPassword,
     address: patientAddress,
     photoURL: "example.jpg"
    };
  
  try {
    const response = await fetch("http://localhost:8082/HCS/patient/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient)
    });

    if (response.ok) {
      alert("Sign up successfully!");
    } else {
      alert("Failed to Sign Up.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
     return(
     
<div className="signup-container">
    <div className="signup-box">
      <div className="signup-form">
        <h4>Join MedConnect</h4>
        <h3>Create Account</h3>
        <form action="#" method="post">
          <p>Full Name:</p>
          <input type="text" name="fullname" placeholder="Full Name" onChange={(e) => setPatientName(e.target.value)} value={patientName} required />
          <p>Email Address:</p>
          <input type="email" name="email" placeholder="Email Address" onChange={(e) => setPatientEmail(e.target.value)} value={patientEmail} required />
          <p>Password:</p>
          <input type="password" name="password" placeholder="Password"onChange={(e)=> setPatientPassword(e.target.value)} value={patientPassword} required minlength="6" />
          <p>Date of Birth:</p>
          <input type="date" name="dob" placeholder="Date of Birth" onChange={(e) => setPatientDOB(e.target.value)} value={patientDOB} required />
          <p>Adress:</p>
          <textarea name="address" placeholder="Address" rows="2" onChange ={(e)=>setPatientAddress(e.target.value)}value={patientAddress} required></textarea>
          <p>Tel:</p>
          <input type="tel" name="contact" placeholder="Contact Number" onChange={(e) => setPatientContact(e.target.value)} value={patientContact} pattern="[0-9]{10}" required />
          
          <p>Gender:</p>
          <div className="gender-group">
            <label><input type="radio" name="gender" value="Male" onChange={(e) => setPatientGender(e.target.value)}
                                                                  checked={patientGender === "Male"} required /> Male</label>

            <label><input type="radio" name="gender" value="Female" onChange={(e) => setPatientGender(e.target.value)}
                                                                  checked={patientGender === "Female"} required /> Female</label>
          </div>

          <button type="submit" onClick={handleSignup}>Sign Up</button>
          <p className="login-link">Already have an account? <Link to="/login">Login</Link></p>
        </form>
      </div>
    </div>
  
  </div>

     );

}

export default Signup;