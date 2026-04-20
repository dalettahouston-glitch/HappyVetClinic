package com.java.vetclinic.controller;

import com.java.vetclinic.entity.User;
import com.java.vetclinic.service.UserService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")

public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllOwners() {
        return userService.getAllOwners();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public User getOwnerById(@PathVariable Long id) {
        return userService.getOwnerById(id);
    }

    @PutMapping("/{id}")
    public User updateOwner(@PathVariable Long id, @RequestBody User user) {
        return userService.updateOwner(id, user);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deleteOwner(@PathVariable Long id) {
        userService.deleteOwner(id);
    }
}