import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Styles/Admin.css';
import './Styles/Doctor.css';

function Admin() {
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [searchDoctor, setSearchDoctor] = useState('');
  const [searchPatient, setSearchPatient] = useState('');
  const [searchDoctorName, setDoctorSearchName] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [dateFilter, setDateFilter] = useState('');
  const [patientSearch, setPatientSearch] = useState('');
  const [foundPatients, setFoundPatients] = useState([]);
  const [notFound, setNotFound] = useState(false);

  const fetchAppointments = async () => {
    const res = await fetch("http://localhost:8083/HCS/appointment/appointments");
    const data = await res.json();
    setAppointments(data);
    setFilteredAppointments(data);
  };

  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8081/HCS/doctor/doctors')
      .then(res => res.json())
      .then(data => setDoctors(data))
      .catch(err => console.error("Error loading doctors", err));
  }, []);

  

  useEffect(() => {
    fetchAppointments();
  }, []);

  const filterAppointments = () => {
    let filtered = appointments;

    if (dateFilter) {
      filtered = filtered.filter(appt => appt.appointmentDate.startsWith(dateFilter));
    }
   
    if (searchDoctor.trim()) {
      filtered = filtered.filter(appt =>
      appt.doctorId.toString().includes(searchDoctor.trim())
      );
     }

    if (searchPatient.trim()) {
      filtered = filtered.filter(appt =>
       appt.patientId.toString().includes(searchPatient.trim())
     );
   }

    setFilteredAppointments(filtered);
  };

  const handleCancel = async (id) => {
    await fetch(`http://localhost:8083/HCS/appointment/cancel/${id}`, { method: 'PUT' });
    fetchAppointments();
  };

  const handleSearch = () => {
    let filtered = doctors;

    if (searchDoctorName.trim()) {
      filtered = filtered.filter(d =>
        d.name.toLowerCase().includes(searchDoctorName.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  };

  const searchPatients = async () => {
    try {
      const res = await fetch(`http://localhost:8082/HCS/patient/patient/name/${patientSearch}`);
      const data = await res.json();
      if (data.length > 0) {
        setFoundPatients(data);
        setNotFound(false);
      } else {
        setFoundPatients([]);
        setNotFound(true);
      }
    } catch (e) {
      setFoundPatients([]);
      setNotFound(true);
    }
  };

  const handleUpdate = (appointmentId) => {
    setFilteredAppointments(prevAppointments =>
      prevAppointments.map(appt =>
        appt.appointmentId === appointmentId && appt.status === 'Scheduled'
          ? { ...appt, status: 'Completed' }
          : appt
      )
    );
  };
  

  return (
    <div className="admin-container">
      <h1>Admin Dashboard</h1>

      <section className="admin-section">
        <h2>All Appointments</h2>
        <div className="filters">
          <input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} placeholder="Filter by date" />
          <input type="text" value={searchDoctor} onChange={(e) => setSearchDoctor(e.target.value)} placeholder="Search by doctor" />
          <input type="text" value={searchPatient} onChange={(e) => setSearchPatient(e.target.value)} placeholder="Search by patient" />
          <button onClick={filterAppointments}>Filter</button>
        </div>
         <div className="scroll-container">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Doctor ID</th><th>Patient ID</th><th>Date/Time</th><th>Status</th><th>Created Date</th><th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map((appt, i) => (
              <tr key={i}>
                <td>{appt.appointmentId}</td>
                <td>{appt.doctorId}</td>
                <td>{appt.patientId}</td>
                <td>{appt.appointmentDate}</td>
                <td style={{ color: appt.status === 'Completed' ? 'green' : appt.status === 'Cancelled' ? 'red' : 'black' }}>{appt.status}</td>
                <td>{appt.createdAt?.split('T')[0]}</td>
                <td>
                  <button className="btn-update" onClick={() => handleUpdate(appt.appointmentId)}>Update</button>
                  <button className="btn-cancel" onClick={() => handleCancel(appt.appointmentId)}>Cancel</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      </section>

      <section className="admin-section">
        <h2>Manage Doctors</h2>
        <div className="admin-links">
          <Link to="/add-doctor" className="btn-link"> Add New Doctor</Link>
          <Link to="/update-doctor" className="btn-link">  Update Existing Doctor</Link>
          <input
            type="text"
            placeholder="Type Doctor's Name here..."
            value={searchDoctorName}
            onChange={(e) => setDoctorSearchName(e.target.value)}
            className="search-input"/>
        <button className="search-button" onClick={handleSearch}>FIND DOCTOR</button>
        </div>
        <div className="doctor-list">
        <div className="doctors-grid">
          {(filteredDoctors.length > 0 ? filteredDoctors : doctors).map((doctor, index) => (
            <div key={index} className="doctor-card">
              <div className="doctor-info">
                <img
                  src={doctor.photoUrl || "https://via.placeholder.com/150"}
                  alt={doctor.name}
                  className="doctor-image"/>
                  <p className="doctor-specialty"> Id: {doctor.doctor_id}</p>
                <h3 className="doctor-name">{doctor.name}</h3>
                <p className="doctor-specialty">{doctor.specialization}</p>
                <p className="doctor-experience">{doctor.experience || "N/A"} experience</p>
                <p className="doctor-hospital">{doctor.hospital}</p>
              </div>
            </div>
          ))}
        </div>
         </div>
      </section>

      <section className="admin-section">
        <h2>Search Patients</h2>
        <input type="text" value={patientSearch} onChange={(e) => setPatientSearch(e.target.value)} placeholder="Enter patient name" />
        <button onClick={searchPatients}>Search</button>

        {notFound && <p>No patient found with that name.</p>}
        {foundPatients.length > 0 && (
          <table>
            <thead>
              <tr>
                <th>ID</th><th>Name</th><th>DOB</th><th>Gender</th><th>Contact</th><th>Email</th><th>Address</th>
              </tr>
            </thead>
            <tbody>
              {foundPatients.map((pat, i) => (
                <tr key={i}>
                  <td>{pat.patient_id}</td>
                  <td>{pat.name}</td>
                  <td>{pat.dob}</td>
                  <td>{pat.gender}</td>
                  <td>{pat.contactNumber}</td>
                  <td>{pat.email}</td>
                  <td>{pat.address}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export default Admin;
