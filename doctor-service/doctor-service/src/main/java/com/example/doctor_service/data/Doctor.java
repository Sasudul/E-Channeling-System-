package com.example.doctor_service.data;

import jakarta.persistence.*;

@Entity
@Table(name = "doctors")
public class Doctor {

    @Id
    @Column(name = "doctor_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int doctor_id;

    @Column(name ="name")
    private String name;

    @Column(name ="specialization")
    private String specialization;

    @Column(name = "contact_number")
    private String contact;

    @Column(name = "email")
    private String email;

    @Column(name = "hospital")
    private String hospital;

    @Column(name ="photo_url")
    private String photoUrl;

    @Column(name = "experince")
    private String experince;

    @Column(name = "password")
    private String password;

    public Doctor() {
    }

    public Doctor(int doctor_id, String name, String specialization,String experince, String contact, String email,String password, String hospital,String photoUrl) {
        this.doctor_id = doctor_id;
        this.name = name;
        this.specialization = specialization;
        this.experince = experince;
        this.contact = contact;
        this.email = email;
        this.password = password;
        this.hospital = hospital;
        this.photoUrl = photoUrl;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSpecialization() {
        return specialization;
    }

    public void setSpecialization(String specialization) {
        this.specialization = specialization;
    }

    public int getDoctor_id() {
        return doctor_id;
    }

    public void setDoctor_id(int doctor_id) {
        this.doctor_id = doctor_id;
    }

    public String getExperience() {
        return experince;
    }

    public void setExperience(String experience) {
        this.experince = experience;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getExperince() {
        return experince;
    }

    public void setExperince(String experince) {
        this.experince = experince;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getHospital() {
        return hospital;
    }

    public void setHospital(String hospital) {
        this.hospital = hospital;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

}
