package com.java.vetclinic.controller;

import com.java.vetclinic.entity.User;
import com.java.vetclinic.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/owners")
public class OwnerController {

    private final UserService userService;

    public OwnerController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public List<User> getAllOwners() {
        return userService.getAllOwners();
    }

    @GetMapping("/{id}")
    public User getOwnerById(@PathVariable Long id) {
        return userService.getOwnerById(id);
    }

    @PostMapping
    public User createOwner(@RequestBody User user) {
        return userService.createOwner(user);
    }

    @PutMapping("/{id}")
    public User updateOwner(@PathVariable Long id, @RequestBody User user) {
        return userService.updateOwner(id, user);
    }

    @DeleteMapping("/{id}")
    public void deleteOwner(@PathVariable Long id) {
        userService.deleteOwner(id);
    }
}