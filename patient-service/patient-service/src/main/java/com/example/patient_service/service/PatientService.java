package com.example.patient_service.service;

import com.example.patient_service.data.Patient;
import jakarta.persistence.Entity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class PatientService {

    @Autowired
    private PatientRepository patientRepository;

    //GET  - get all patients
    public List<Patient> getAllPatients() {
        return patientRepository.findAll();
    }

    //GET - get patient by ID
    public Patient getPatientById(int id) {
        Optional<Patient> patient = patientRepository.findById(id);
       return patient.orElse(null);
    }

    //GET - login by Email and Password
    public Patient login(String email, String password) {
        return patientRepository.findByEmailAndPassword(email, password);
    }


    //GET - get pateint by Name
    public List<Patient> searchByName(String name) {
        return patientRepository.searchByName(name);
    }

    //POST - create an new Patient
    public Patient createPatient(Patient patient) {
        return patientRepository.save(patient);
    }

    //PUT - update an Patient
    public Patient updatePatient(Patient patient) {
        return patientRepository.save(patient);
    }
    //Delete - Delete an Patient
    public Patient deletePatient(int id) {
        Optional<Patient> patient = patientRepository.findById(id);
        if (patient.isPresent()) {
            patientRepository.delete(patient.get());
            return patient.get();
        }
        else {
            return null;
        }
    }
}
