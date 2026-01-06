package com.example.doctor_service.service;

import com.example.doctor_service.data.Doctor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DoctorService {

    @Autowired
 private DoctorRepository doctorRepository;

 // GET method to get all doctors
public List<Doctor> getAllDoctors()
{
    return doctorRepository.findAll();
}

// GET method to get doctor by ID
    public Doctor getDocById(int id){
      Optional<Doctor> doctor = doctorRepository.findById(id);
      return doctor.orElse(null);
    }

    //GET method to get all doctors by Name
    public List<Doctor> searchByDoctorName(String name) {
        return doctorRepository.searchByDoctorName(name);
    }

//GET method to get all doctors by Specialization
    public List<Doctor> searchByDoctorSpecialization(String specialization){
       return doctorRepository.searchByDoctorSpecialization(specialization);
    }

    //GET - login by Email and Password
    public Doctor login(String email, String password) {
        return doctorRepository.findByEmailAndPassword(email, password);
    }

// POST method to save Doctors
    public Doctor saveDoctor(Doctor doctor)
    {
              return doctorRepository.save(doctor);
    }

//PUT method for Updating Doctors
    public Doctor updateDoctor(Doctor doctor)
    {
        return doctorRepository.save(doctor);
    }

//DELETE method for Deleting Doctors
    public Doctor deleteDoctor(int id)
    {
        Optional<Doctor> doc = doctorRepository.findById(id);
          if (doc.isPresent()) {
              doctorRepository.delete(doc.get());
              return doc.get();
          }
          else {
              return null;
          }
    }



}
