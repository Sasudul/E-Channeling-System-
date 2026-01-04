//Patient MicroService

create database patient_ms;
use patient_ms;

CREATE TABLE patients (
    patient_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    dob DATE,
    gender VARCHAR(15),
    contact_number VARCHAR(15),
    email VARCHAR(100),
    password VARCHAR(30),
    address TEXT,
    photo_url VARCHAR(255)
);

//Doctor MicroService

create database doctor_ms;
use doctor_ms;

CREATE TABLE doctors (
    doctor_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    specialization VARCHAR(100),
    contact_number VARCHAR(15),
    email VARCHAR(100),
    password VARCHAR(30),
    hospital VARCHAR(150),
    photo_url VARCHAR(255)
);

//Appointment MicroService

create database appointment_ms;
use appointment_ms;

CREATE TABLE appointments (
    appointment_id INT AUTO_INCREMENT PRIMARY KEY,
    patient_id INT,
    doctor_id INT,
    appointment_date DATETIME,
    status ENUM('Scheduled', 'Completed', 'Cancelled'),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

//Admin MicroService

create database admin_ms;
use admin_ms;

CREATE TABLE admin(
        username varchar(5) PRIMARY KEY,
        password varchar(8)
);

