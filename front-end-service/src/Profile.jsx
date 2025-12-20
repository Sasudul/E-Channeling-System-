import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar';
import './Styles/Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const storedPatient = JSON.parse(localStorage.getItem("loggedPatient"));
    if (!storedPatient || !storedPatient.patient_id) {
      navigate("/login");
      return;
    }

    fetch(`http://localhost:8082/HCS/patient/patient/id/${storedPatient.patient_id}`)
    .then(res => res.json())
      .then(data => setPatient(data))
      .catch(err => console.error("Error fetching profile:", err));
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:8082/HCS/patient/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(patient)
      });

      if (response.ok) {
        alert("Profile updated successfully");
        localStorage.setItem("loggedPatient", JSON.stringify(patient));
      } else {
        alert("Update failed");
      }
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete your profile?")) return;

    try {
      await fetch(`http://localhost:8082/HCS/patient/delete/${patient.patient_id}`, { method: 'DELETE' });
      localStorage.removeItem("loggedPatient");
      navigate("/login");
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  if (!patient) return <p>Loading...</p>;

  return (
    <main className="profile-container">
      <aside className="profile-sidebar">
        <img src={patient.photoURL} alt="Profile" className="profile-photo" />
        <h2>{patient.name}</h2>
        <ul className="profile-menu">
          <li><a href="#personal">Personal Info</a></li>
          <li><Link to="/Pappointments">Booked Appointments</Link></li>

        </ul>
      </aside>

      <section className="profile-content">
        <section id="personal">
          <h3>Personal Information</h3>

          <div className="input-group">
            <label>Name:</label>
            <input type="text" name="name" value={patient.name} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Date of Birth:</label>
            <input type="date" name="dob" value={patient.dob} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Gender:</label>
            <select name="gender" value={patient.gender} onChange={handleChange}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="input-group">
            <label>Phone:</label>
            <input type="tel" name="contactNumber" value={patient.contactNumber} onChange={handleChange} />
          </div>
        
          <div className="input-group">
            <label>Email:</label>
            <input type="email" name="email" value={patient.email} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Password:</label>
            <input type="password" name="password" value={patient.password} onChange={handleChange} />
          </div>

          <div className="input-group">
            <label>Address:</label>
            <textarea name="address" value={patient.address} onChange={handleChange}></textarea>
          </div>

          <div className="button-group">
            <button className="update-btn" onClick={handleUpdate}>Update</button>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default Profile;
