import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Styles/appointment.css';

function Appointment() {
  const location = useLocation();
  const navigate = useNavigate();

  const selectedDoctor = location.state?.doctor;
  const loggedPatient = JSON.parse(localStorage.getItem('loggedPatient'));

  const [doctorId, setDoctorId] = useState(selectedDoctor?.doctor_id || '');
  const [hospital, setHospital] = useState(selectedDoctor?.hospital || '');
  const [specialization, setSpecialization] = useState(selectedDoctor?.specialization || '');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [notes, setNotes] = useState('');
  const [status] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const appointment = {
      doctorId: selectedDoctor?.doctor_id,
      patientId: loggedPatient?.patient_id,
      appointmentDate,
      notes,
      status: "Scheduled"
    };

    try {
      const response = await fetch("http://localhost:8083/HCS/appointment/appointment/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(appointment)
      });

      if (response.ok) {
        alert("Appointment booked successfully!");
      } else {
        alert("Failed to book appointment.");
      }
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div className="appointment-container">
      <form className="appointment-box" onSubmit={handleSubmit}>
        <h2>Channel Your Doctor</h2>

        <input type="text" value={selectedDoctor?.name || ''} disabled />
        <input type="text" value={hospital} disabled />
        <input type="text" value={specialization} disabled />

        <input
          type="datetime-local"
          value={appointmentDate}
          onChange={(e) => setAppointmentDate(e.target.value)}
          required
        />

        <textarea
          placeholder="Add notes..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />

        <button type="submit">
          🔍 Book
        </button>
      </form>
    </div>
  );
}

export default Appointment;
