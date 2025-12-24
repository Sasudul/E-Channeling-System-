package com.example.appointment_service.service;

import com.example.appointment_service.data.Appointment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.awt.print.Pageable;
import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository appointmentRepository;

///GET method - Select * Appointments
    public List<Appointment> getAllAppointments() {
        return appointmentRepository.findAll();
    }

///GET method - Select * Appointments by id
    public Appointment getAppointmentById(int id) {
        return appointmentRepository.findById(id).get();
    }

///GET method - Select * Appointments by patientId
   public List<Appointment> findByPatientId(int patient_Id) {
        return appointmentRepository.findByPatientId(patient_Id);
   }
///GET method - Select * Appointments by patientId
   public List<Appointment> findByDoctorId(int doctor_Id) {
        return appointmentRepository.findByDoctorId(doctor_Id);
   }

///GET method - Select * Appointments by Appointment  Status
   public List<Appointment> findAppointmentByStatus(String status) {
        return appointmentRepository.findAppointmentByStatus(status);
   }
///POST method - Create new Appointment
   public Appointment createAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
   }

///PUT method - Update new Appointment
   public Appointment updateAppointment(Appointment appointment) {
        return appointmentRepository.save(appointment);
   }

///DELETE method - Delete Appointment by Id
     public Appointment deleteAppointment(int id) {
         Optional<Appointment> app = appointmentRepository.findById(id);
         if (app.isPresent()) {
             appointmentRepository.delete(app.get());
             return app.get();
         }
         else {
             return null;
         }
     }
///PUT method - Update Appointment status
    public Appointment cancelAppointment(int appointmentId) {
        Optional<Appointment> optional = appointmentRepository.findById(appointmentId);
        if (optional.isPresent()) {
            Appointment appointment = optional.get();
            appointment.setStatus(Appointment.Status.valueOf("Cancelled"));
            return appointmentRepository.save(appointment);
        }
        return null;
    }


}
