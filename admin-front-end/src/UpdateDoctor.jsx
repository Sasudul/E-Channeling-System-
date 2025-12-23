import { useState } from 'react';
import './Styles/UpdateDoctor.css';

function UpdateDoctors() {
  const [searchName, setSearchName] = useState('');
  const [doctor, setDoctor] = useState({
    doctor_id: '',
    name: '',
    specialization: '',
    contact: '',
    email: '',
    experince: '',
    hospital: '',
    photoUrl: ''
  });

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://localhost:8081/HCS/doctor/doctors/search/name/${searchName}`);
      const data = await response.json();
      if (data.length > 0) {
        setDoctor(data[0]);
      } else {
        alert('No doctor found with that name');
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch('http://localhost:8081/HCS/doctor/doctors/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(doctor)
      });
      if (response.ok) {
        alert('Doctor updated successfully');
      } else {
        alert('Update failed');
      }
    } catch (error) {
      console.error('Update error:', error);
    }
  };

  const handleDelete = async () => {
    if (!doctor.doctor_id) {
      alert('No doctor selected');
      return;
    }
    try {
      const res = await fetch(`http://localhost:8081/HCS/doctor/doctor/delete/${doctor.doctor_id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        alert('Doctor deleted successfully');
        setDoctor({
          doctor_id: '',
          name: '',
          specialization: '',
          contact: '',
          email: '',
          experince: '',
          hospital: '',
          photoUrl: ''
        });
      } else {
        alert('Delete failed');
      }
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  return (
    <main className="profile-container">
      <aside className="profile-sidebar">
        <img src={doctor.photoUrl || "https://via.placeholder.com/150"} alt="Profile" className="profile-photo" />
        <h2>{doctor.name}</h2>
      </aside>

      <section className="profile-content">
        <input type="text"
          placeholder="Type Doctor's Name here..." className="search-input" value={searchName} onChange={(e) => setSearchName(e.target.value)} />

        <button className="search-button" onClick={handleSearch}>FIND DOCTOR</button>

        <section id="doctor-details">
          <h3>Doctor Details</h3>

          <p>Full Name:</p>
          <input type="text" value={doctor.name} onChange={(e) => setDoctor({ ...doctor, name: e.target.value })}/>

          <p>Specialization:</p>
          <select value={doctor.specialization} onChange={(e) => setDoctor({ ...doctor, specialization: e.target.value })}>
            <option value="">Select Specialization</option>
            <option value="General Medicine">General Medicine</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Dermatology">Dermatology</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Gynecology">Gynecology</option>
            <option value="Neurology">Neurology</option>
            <option value="Psychiatry">Psychiatry</option>
          </select>

          <p>Tel:</p>
          <input type="tel" value={doctor.contact} onChange={(e) => setDoctor({ ...doctor, contact: e.target.value })}/>

          <p>Email Address:</p>
          <input type="email" value={doctor.email} onChange={(e) => setDoctor({ ...doctor, email: e.target.value })}/>

          <p>Experience:</p>
          <input type="text" value={doctor.experince} onChange={(e) => setDoctor({ ...doctor, experince: e.target.value })}/>

          <p>Hospital:</p>
          <input type="text" value={doctor.hospital} onChange={(e) => setDoctor({ ...doctor, hospital: e.target.value })}/>

          <p>Photo URL:</p>
          <textarea value={doctor.photoUrl} onChange={(e) => setDoctor({ ...doctor, photoUrl: e.target.value })}/>

          <div className="button-group">
            <button className="update-btn" onClick={handleUpdate}>Update</button>
            <button className="delete-btn" onClick={handleDelete}>Delete</button>
          </div>
        </section>
      </section>
    </main>
  );
}

export default UpdateDoctors;
