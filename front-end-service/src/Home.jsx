 import { Link } from 'react-router-dom';
import './Styles/Home.css';


 function Home(){

    return(
   
   <body>
    <section className="hero">
      <div className="hero-content">
        <h1>Your Health, <span>Our Priority</span></h1>
        <p>Connect with Sri Lanka’s top medical professionals from the comfort of your home. Health Care makes doctor consultations simple, secure, and accessible for everyone.</p>
        <div className="hero-buttons">
          <Link to= "/doctor" className="book">Book Appointment</Link>
          <a href="#" className="learn">Learn More</a>
        </div>
      </div>
      <img src="https://img.freepik.com/free-photo/team-young-specialist-doctors-standing-corridor-hospital_1303-21199.jpg?ga=GA1.1.1599094260.1750229972&w=740" alt="Medical Team"></img>
    </section>

    <section className="how-it-works">
  <h2>   How MedConnect Works    </h2>
  <div className="steps-container">
    <div className="step">
      <img src="https://cdn-icons-png.flaticon.com/512/2989/2989987.png" alt="Search Doctor" />
      <h3>1. Search for a Doctor</h3>
      <p>Find qualified specialists based on symptoms, specialty, or location.</p>
     </div>
      <div className="step">
      <img src="https://cdn-icons-png.flaticon.com/512/3062/3062634.png" alt="Book Appointment" />
      <h3>2. Book Appointment</h3>
      <p>Select a time slot that works for you and confirm your appointment online.</p>
     </div>
     <div className="step">
      <img src="https://cdn-icons-png.flaticon.com/512/3062/3062633.png" alt="Consult Online" />
      <h3>3. Consult the Doctor</h3>
      <p>Join a secure video call or in-person visit and get medical advice or prescriptions.</p>
     </div>
     </div>
   </section>
   

  <footer className="site-footer">
  <div className="footer-content">
    <div className="footer-about">
      <h3>About MedConnect</h3>
      <p> MedConnect is Sri Lanka’s trusted online doctor channelling platform. 
        We are committed to making healthcare accessible, secure, and stress-free 
        for patients across the island.</p>
    </div>
    <div className="footer-contact">
      <h3>Contact Us</h3>
         <p><i className="fas fa-phone-alt"></i> +94 71 234 5678</p>
      <p><i className="fas fa-envelope"></i> support@medconnect.lk</p>
      <p><Link to="/Dlogin" style={{ color: '#fff' }}>Are you an Doctor?</Link></p>
    </div>
  </div>
  <div className="footer-bottom">
    <p>&copy; 2025 MedConnect. All rights reserved.</p>
  </div>
   </footer>
   </body>

   
    );

 }

 export default Home