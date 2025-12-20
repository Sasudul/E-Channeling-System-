import { useEffect, useState } from 'react';
import './Styles/PatientAppointment.css';

function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [patients, setPatients] = useState({});
  const [selectedDate, setSelectedDate] = useState('');
  const [searchName, setSearchName] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const doctor = JSON.parse(localStorage.getItem('loggedDoctor'));

    if (!doctor || !doctor.doctor_id) {
      alert('You must be logged in to view appointments.');
      return;
    }

    // Fetch appointments by doctor ID
    fetch(`http://localhost:8083/HCS/appointment/appointment/doctor/${doctor.doctor_id}`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error('Error fetching appointments:', err));

    // Fetch all patients
    fetch('http://localhost:8082/HCS/patient/patients')
      .then(res => res.json())
      .then(data => {
        const patientMap = {};
        data.forEach(p => {
          patientMap[p.patient_id] = p;
        });
        setPatients(patientMap);
      })
      .catch(err => console.error('Error fetching patients:', err));
  }, []);

  const filteredAppointments = appointments.filter(appt => {
    const apptDate = new Date(appt.appointmentDate).toISOString().split('T')[0];
    const matchesDate = !selectedDate || apptDate === selectedDate;

    const patientName = patients[appt.patientId]?.name?.toLowerCase() || '';
    const matchesName = !searchName || patientName.includes(searchName.toLowerCase());

    const matchesStatus = !statusFilter || appt.status === statusFilter;

    return matchesDate && matchesName && matchesStatus;
  });

  return (
    <div className="appointments-container">
      <h2>Your Appointments</h2>

      <div className="filter-bar">
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="filter-input"
        />
        <input
          type="text"
          placeholder="Search by Patient Name"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="filter-input"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="filter-input"
        >
          <option value="">All</option>
          <option value="Scheduled">Scheduled</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {filteredAppointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Patient</th>
              <th>Date</th>
              <th>Status</th>
              <th>Notes</th>
              <th>Created At</th>
            </tr>
          </thead>
          <tbody>
            {filteredAppointments.map(appt => (
              <tr key={appt.appointmentId}>
                <td>{appt.appointmentId}</td>
                <td>{patients[appt.patientId]?.name || 'Patient Not Found'}</td>
                <td>{new Date(appt.appointmentDate).toLocaleString()}</td>
                <td style={{ color: appt.status === 'Completed' ? 'green' : appt.status === 'Cancelled' ? 'red' : 'black' }}>{appt.status}</td>
                <td>{appt.notes}</td>
                <td>{new Date(appt.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PatientAppointments;
