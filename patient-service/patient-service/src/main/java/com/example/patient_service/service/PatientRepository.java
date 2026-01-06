package com.example.patient_service.service;

import com.example.patient_service.data.Patient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PatientRepository extends JpaRepository<Patient, Integer> {

  @Query("SELECT p FROM Patient p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :name, '%'))")
  List<Patient> searchByName(@Param("name") String name);

  @Query("SELECT p FROM Patient p WHERE p.email = ?1 AND p.password = ?2")
  Patient findByEmailAndPassword(String email, String password);

}

