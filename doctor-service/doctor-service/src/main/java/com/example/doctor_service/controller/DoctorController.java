package com.example.doctor_service.controller;


import com.example.doctor_service.data.Doctor;
import com.example.doctor_service.service.DoctorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.print.Doc;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/doctor")
public class DoctorController {

    @Autowired
    private DoctorService Obj;

    @GetMapping("/doctors")
    public List<Doctor> getAllDoctors() {
        return Obj.getAllDoctors();
    }

    @GetMapping("/doctor/{id}")
    public Doctor getDoctorById(@PathVariable int id) {
        return  Obj.getDocById(id);
    }

    @GetMapping("/doctors/search/name/{name}")
    public List<Doctor> searchByDoctorName(@PathVariable String name) {
        return Obj.searchByDoctorName(name);
    }

    @GetMapping("/doctors/search/specialization/{specialization}")
    public List<Doctor> searchBySpecialization(@PathVariable String specialization) {
        return Obj.searchByDoctorSpecialization(specialization);
    }

    @PostMapping("/doctor/login")
    public ResponseEntity<Doctor> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        Doctor doctor = Obj.login(email, password);
        if (doctor != null) {
            return ResponseEntity.ok(doctor);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }

    @PostMapping("/doctors/add")
    public Doctor saveDoctor(@RequestBody Doctor doctor) {
        return Obj.saveDoctor(doctor);
    }

    @PutMapping("/doctors/update")
    public Doctor updateDoctor(@RequestBody Doctor doctor) {
        return Obj.updateDoctor(doctor);
    }

    @DeleteMapping("/doctor/delete/{id}")
    public Doctor deleteDoctor(@PathVariable int id) {
        return Obj.deleteDoctor(id);
    }


}
