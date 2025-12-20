
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Styles/Navbar.css';

function Navbar () {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("loggedPatient");
    setIsLoggedIn(!!user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("loggedPatient");
    setIsLoggedIn(false);
    navigate("/");
  };


  return (
    <header className="site-header">
    <div className="logo">
      <img src="https://th.bing.com/th/id/OIP.tfeqPKZC3faF0iz2HUXFCAHaHa?rs=1&pid=ImgDetMain" alt="Logo" />
     <Link to ="/" style={{textDecoration: "none", color:"#000000"}}> MedConnect</Link>
    </div>
    <nav className="site-nav">
       <Link to="/">Home</Link>
       <Link to="/doctor">Doctors</Link>
       <Link to="/profile" >Profile</Link>
       {/* <Link to ="/ADlogin">Admin</Link> */}

       {isLoggedIn ? (
        <>
          <Link to="/" onClick={handleLogout}>Logout</Link>
        </>
       ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
        </>
       )};
       <Link to="/doctor" className="btn btn-primary">Book Now</Link>
    </nav>
    </header>
  );
};

export default Navbar;
