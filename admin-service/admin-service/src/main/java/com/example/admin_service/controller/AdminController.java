package com.example.admin_service.controller;


import com.example.admin_service.data.Admin;
import com.example.admin_service.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@CrossOrigin(origins = "http://localhost:5174")
@RestController
@RequestMapping("/Admin")
public class AdminController {

//    @Autowired
    private AdminService Obj;

    @PostMapping("/login")
    public ResponseEntity<Admin> login(@RequestBody Map<String, String> loginData) {
        String username = loginData.get("userName");
        String password = loginData.get("password");
        Admin admin = Obj.login(username, password);
        if (admin != null) {
            return ResponseEntity.ok(admin);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
    }
}
