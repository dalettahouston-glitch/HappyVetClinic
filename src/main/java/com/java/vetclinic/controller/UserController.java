package com.java.vetclinic.controller;

import com.java.vetclinic.entity.User;
import com.java.vetclinic.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<List<User>> getAllOwners() {
        return ResponseEntity.ok(userService.getAllOwners());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getOwnerById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getOwnerById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateOwner(@PathVariable Long id, @RequestBody User user) {
        return ResponseEntity.ok(userService.updateOwner(id, user));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<Void> deleteOwner(@PathVariable Long id) {
        userService.deleteOwner(id);
        return ResponseEntity.ok().build();
    }
}