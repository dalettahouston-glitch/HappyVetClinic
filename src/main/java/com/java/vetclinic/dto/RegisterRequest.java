package com.java.vetclinic.dto;

import com.java.vetclinic.entity.Role;

public record RegisterRequest(String username, String password, String phone, String email, String name, Role role) {}

