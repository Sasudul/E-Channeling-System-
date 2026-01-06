package com.example.patient_service.data;

import jakarta.persistence.*;

import javax.xml.crypto.Data;
import java.time.LocalDate;
import java.util.Date;

@Entity
@Table(name ="patients")
public class Patient {

    @Id
    @Column(name="patient_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int patient_id;

    @Column(name ="name")
    private String name;

    @Column(name ="dob")
    private LocalDate DOB;

    @Column(name ="gender")
    private String gender;

    @Column(name ="contact_number")
    private String contactNumber;

    @Column(name ="email")
    private String email;

    @Column(name ="password")
    private String password;

    @Column(name = "address")
    private String address;

    @Column(name = "photo_url")
    private String photoURL;

    public Patient() {
    }

    public Patient(int patient_id, String name, LocalDate DOB, String gender, String contactNumber, String email,String password, String address, String photoURL) {
        this.patient_id = patient_id;
        this.name = name;
        this.DOB = DOB;
        this.gender = gender;
        this.contactNumber = contactNumber;
        this.email = email;
        this.password = password;
        this.address = address;
        this.photoURL = photoURL;
    }

    public int getPatient_id() {
        return patient_id;
    }

    public void setPatient_id(int patient_id) {
        this.patient_id = patient_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public LocalDate getDOB() {
        return DOB;
    }

    public void setDOB(LocalDate DOB) {
        this.DOB = DOB;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getPhotoURL() {
        return photoURL;
    }

    public void setPhotoURL(String photoURL) {
        this.photoURL = photoURL;
    }
}
