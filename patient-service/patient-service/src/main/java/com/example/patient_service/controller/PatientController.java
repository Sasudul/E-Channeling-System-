package com.example.patient_service.controller;

import com.example.patient_service.data.Patient;
import com.example.patient_service.service.PatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:5174"})
@RestController
@RequestMapping("/patient")
public class PatientController {

    @Autowired
    private PatientService Obj;

    @GetMapping("/patients")
    public List<Patient> getAllPatients() {
        return Obj.getAllPatients();
    }

    @GetMapping("/patient/id/{id}")
    public Patient getPatientById(@PathVariable int id) {
        return Obj.getPatientById(id);
    }

    @GetMapping("/patient/name/{name}")
    public List<Patient> getPatientByName(@PathVariable String name) {
        return Obj.searchByName(name);
    }

    @PostMapping("/patient/login")
    public ResponseEntity<Patient> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");
        Patient patient = Obj.login(email, password);
        if (patient != null) {
            return ResponseEntity.ok(patient);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }


    @PostMapping("/create")
    public Patient createPatient(@RequestBody Patient patient) {
        return Obj.createPatient(patient);
    }

    @PutMapping("/update")
    public Patient updatePatient(@RequestBody Patient patient) {
        return Obj.updatePatient(patient);
    }

    @DeleteMapping("/delete/{id}")
    public Patient deletePatient(@PathVariable int id) {
        return Obj.deletePatient(id);
    }
}
