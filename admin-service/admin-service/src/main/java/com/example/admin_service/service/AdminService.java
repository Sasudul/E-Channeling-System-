package com.example.admin_service.service;

import com.example.admin_service.data.Admin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AdminService {

    @Autowired
    AdminRepository adminRepository;

    //GET - Admin Login
    public Admin login(String username, String password) {
        return adminRepository.login(username, password);
    }

}
