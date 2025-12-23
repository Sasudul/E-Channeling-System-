package com.example.admin_service.service;

import com.example.admin_service.data.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface AdminRepository extends JpaRepository<Admin, String> {

    @Query("select a FROM Admin a where a.username = ?1 and a.password =?2")
    public Admin login(String username, String password);

}
