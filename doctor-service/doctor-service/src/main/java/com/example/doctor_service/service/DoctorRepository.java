package com.example.doctor_service.service;

import com.example.doctor_service.data.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DoctorRepository extends JpaRepository<Doctor, Integer> {

    @Query("Select d from Doctor d Where d.name = ?1")
   public List<Doctor> searchByDoctorName(String name);

    @Query("Select d from Doctor d Where d.specialization = ?1")
    public List<Doctor> searchByDoctorSpecialization(String specialization);

    @Query("Select d from Doctor d WHERE d.email = ?1 AND d.password = ?2")
    Doctor findByEmailAndPassword(String email, String password);
}
