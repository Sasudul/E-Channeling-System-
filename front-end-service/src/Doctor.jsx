import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Styles/Doctor.css';

function Doctor() {
  const [doctors, setDoctors] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [searchName, setSearchName] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  const specialties = [
    'General Medicine', 'Cardiology', 'Dermatology', 'Pediatrics',
    'Orthopedics', 'Gynecology', 'Neurology', 'Psychiatry'
  ];

  useEffect(() => {
    fetch('http://localhost:8081/HCS/doctor/doctors')
      .then(res => res.json())
      .then(data => {
        setDoctors(data);
        setFilteredDoctors(data);
      })
      .catch(err => console.error("Error fetching doctors:", err));
  }, []);

  const handleSearch = () => {
    let filtered = doctors;

    if (searchName.trim()) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (selectedSpecialty) {
      filtered = filtered.filter(d =>
        d.specialization.toLowerCase() === selectedSpecialty.toLowerCase()
      );
    }

    setFilteredDoctors(filtered);
  };
  
  const navigate = useNavigate();

  const handleBook = (doctor) => {
    navigate("/appointment", { state: { doctor } });
  };

  return (
    <section id="doctor" className="channel-doctor-section">
      <div className="channel-doctor-container">
        <div className="channel-doctor-header">
          <h2 className="channel-doctor-title">Channel Your Doctor</h2>
          <p className="channel-doctor-description">
            Choose from our network of qualified medical professionals and book your consultation today
          </p>
        </div>

        <div className="search-bar-container">
          <input
            type="text"
            placeholder="Type Doctor's Name here..."
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            className="search-input"
          />
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="search-select"
          >
            <option value="">Select Speciality</option>
            {specialties.map((specialty) => (
              <option key={specialty} value={specialty}>{specialty}</option>
            ))}
          </select>
          <button className="search-button" onClick={handleSearch}>FIND DOCTOR</button>
        </div>

        <div className="doctors-grid">
          {filteredDoctors.map((doctor, index) => (
            <div key={index} className="doctor-card">
              <div className="doctor-info">
                <img
                  src={doctor.photoUrl || "https://via.placeholder.com/150"}
                  alt={doctor.name}
                  className="doctor-image"
                />
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialty">{doctor.specialization}</p>
                <p className="doctor-experience">{doctor.experience || "N/A"} experience</p>
                <p className="doctor-hospital">{doctor.hospital}</p>
                <button onClick={() => handleBook(doctor)} className="book-appointment-btn">
              Book Appointment
              </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Doctor;
