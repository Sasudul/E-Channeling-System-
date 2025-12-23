import { useState } from "react";
import './Styles/AddDoctor.css';

function AddDoctor() {
  const [doctorName, setDoctorName] = useState('');
  const [doctorSpecialization, setDoctorSpecialization] = useState('');
  const [doctorExperience, setDoctorExperience] = useState('');
  const [doctorContact, setDoctorContact] = useState('');
  const [doctorEmail, setDoctorEmail] = useState('');
  const [doctorPassword, setDoctorPassword] = useState('');
  const [doctorHospital, setDoctorHospital] = useState('');
  const [doctorPhoto, setDoctorPhoto] = useState('');

  const handleAddDoctor = async (e) => {
    e.preventDefault();

    const newDoctor = {
      name: doctorName,
      specialization: doctorSpecialization,
      experince: doctorExperience + "years",
      contact: doctorContact,
      email: doctorEmail,
      password: doctorPassword,
      hospital: doctorHospital,
      photoUrl: doctorPhoto
    };

    try {
      const response = await fetch("http://localhost:8081/HCS/doctor/doctors/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newDoctor)
      });

      if (response.ok) {
        alert("Doctor added successfully!");
        setDoctorName('');
        setDoctorSpecialization('');
        setDoctorExperience('');
        setDoctorContact('');
        setDoctorEmail('');
        setDoctorPassword('');
        setDoctorHospital('');
        setDoctorPhoto('');
      } else {
        alert("Failed to add doctor.");
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="add-doctor-box">
      <div className="add-doctor-form">
        <h3>Add a Doctor</h3>
        <form onSubmit={handleAddDoctor}>
          <p>Full Name:</p>
          <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} required />

          <p>Specialization:</p>
          <select value={doctorSpecialization} onChange={(e) => setDoctorSpecialization(e.target.value)} required>
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

          <p>Experience (years):</p>
          <input type="text" value={doctorExperience} onChange={(e) => setDoctorExperience(e.target.value)} required />

          <p>Phone:</p>
          <input type="tel" pattern="[0-9]{10}" value={doctorContact} onChange={(e) => setDoctorContact(e.target.value)} required />

          <p>Email:</p>
          <input type="email" value={doctorEmail} onChange={(e) => setDoctorEmail(e.target.value)} required />

          <p>Password:</p>
          <input type="password" value={doctorPassword} onChange={(e) => setDoctorPassword(e.target.value)} required minLength={6} />

          <p>Hospital:</p>
          <input type="text" value={doctorHospital} onChange={(e) => setDoctorHospital(e.target.value)} required />

          <p>Photo URL:</p>
          <textarea rows="1" value={doctorPhoto} onChange={(e) => setDoctorPhoto(e.target.value)} required />

          <button type="submit">Add New Doctor</button>
        </form>
      </div>
    </div>
  );
}

export default AddDoctor;
