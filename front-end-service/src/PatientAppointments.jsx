import { useEffect, useState } from 'react';
import './Styles/PatientAppointment.css';

function PatientAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState({});

  useEffect(() => {
    const patient = JSON.parse(localStorage.getItem('loggedPatient'));

    if (!patient || !patient.patient_id) {
      alert('You must be logged in to view appointments.');
      return;
    }

    fetch(`http://localhost:8083/HCS/appointment/appointments/patient/${patient.patient_id}`)
      .then(res => res.json())
      .then(data => setAppointments(data))
      .catch(err => console.error('Error fetching appointments:', err));

    fetch('http://localhost:8081/HCS/doctor/doctors')
      .then(res => res.json())
      .then(data => {
        const doctorMap = {};
        data.forEach(doc => {
          doctorMap[doc.doctor_id] = doc;
        });
        setDoctors(doctorMap);
      })
      .catch(err => console.error('Error fetching doctors:', err));
  }, []);

  const handleCancel = async (appointmentId) => {
    try {
      const res = await fetch(`http://localhost:8083/HCS/appointment/cancel/${appointmentId}`, {
        method: 'PUT'
      });
      if (res.ok) {
        setAppointments(prev =>
          prev.map(appt =>
            appt.appointment_id === appointmentId ? { ...appt, status: 'Cancelled' } : appt
          )
        );
        alert('Appointment cancelled successfully.');
        window.location.reload();

      } else {
        alert('Failed to cancel appointment.');
      }
    } catch (err) {
      console.error('Error cancelling appointment:', err);
    }
  };

  return (
    <div className="appointments-container">
      <h2>Your Appointments</h2>
      {appointments.length === 0 ? (
        <p>No appointments found.</p>
      ) : (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Doctor</th>
              <th>Date</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map(appt => (
              <tr key={appt.appointment_id}>
                <td>{appt.appointmentId}</td>
                <td>{doctors[appt.doctorId]?.name || 'Doctor Not Found'}</td>
                <td>{new Date(appt.appointmentDate).toLocaleString()}</td>
                <td style={{ color: appt.status === 'Completed' ? 'green' : appt.status === 'Cancelled' ? 'red' : 'black' }}>{appt.status}</td>
                <td>{new Date(appt.createdAt).toLocaleDateString()}</td>
                <td>
                     <button onClick={() => handleCancel(appt.appointmentId)}
                     className="cancel-btn" disabled={appt.status !== 'Scheduled'}>
                      Cancel
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PatientAppointments;
