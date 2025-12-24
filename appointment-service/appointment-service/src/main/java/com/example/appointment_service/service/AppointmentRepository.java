package com.example.appointment_service.service;

import com.example.appointment_service.data.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {

    List<Appointment> findByPatientId(int patientId);
    List<Appointment> findByDoctorId(int doctorId);

    @Query("Select a from Appointment a Where a.status =?1")
   public List<Appointment> findAppointmentByStatus(String status);
}
