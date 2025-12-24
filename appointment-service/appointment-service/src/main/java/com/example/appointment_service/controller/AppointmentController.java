package com.example.appointment_service.controller;

import com.example.appointment_service.data.Appointment;
import com.example.appointment_service.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/appointment")
public class AppointmentController {

    @Autowired
    AppointmentService appointmentService;

    @GetMapping("/appointments")
    public List<Appointment> getAppointments() {
        return appointmentService.getAllAppointments();
    }

    @GetMapping("/appointment/{id}")
    public Appointment getAppointmentById(@PathVariable int id) {
        return appointmentService.getAppointmentById(id);
    }

    @GetMapping("/appointment/doctor/{doctor_id}")
    public List<Appointment> findByDoctorId(@PathVariable int doctor_id) {
        return appointmentService.findByDoctorId(doctor_id);
    }

    @GetMapping("/appointments/patient/{patient_id}")
    public List<Appointment> findAppointmentByPatientId(@PathVariable int patient_id) {
        return appointmentService.findByPatientId(patient_id);
    }

    @GetMapping("/appointment/status/{status}")
    public List<Appointment> getAppointmentStatus(@PathVariable String status) {
        return appointmentService.findAppointmentByStatus(status);
    }

    @PostMapping("/appointment/create")
    public Appointment createAppointment(@RequestBody Appointment appointment) {
        return appointmentService.createAppointment(appointment);
    }

    @PutMapping("/appointment/update")
    public Appointment updateAppointment(@RequestBody Appointment appointment) {
        return appointmentService.updateAppointment(appointment);
    }

    @PutMapping("/cancel/{appointmentId}")
    public Appointment cancelAppointment(@PathVariable int appointmentId) {
        return appointmentService.cancelAppointment(appointmentId);
    }

    @DeleteMapping("/appointment/delete/{id}")
    public void deleteAppointment(@PathVariable int id) {
        appointmentService.deleteAppointment(id);
    }


}
