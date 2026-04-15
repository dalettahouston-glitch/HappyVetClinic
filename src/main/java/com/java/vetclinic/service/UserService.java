package com.java.vetclinic.service;

import com.java.vetclinic.entity.User;
import com.java.vetclinic.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllOwners() {
        return userRepository.findAll();
    }

    public User getOwnerById(Long id) {
        return userRepository.findById(id).orElse(null);
    }

    public User createOwner(User user) {
        return userRepository.save(user);
    }

    public User updateOwner(Long id, User updatedUser) {
        User existing = userRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }

        existing.setFirstName(updatedUser.getFirstName());
        existing.setLastName(updatedUser.getLastName());
        existing.setPhone(updatedUser.getPhone());
        existing.setEmail(updatedUser.getEmail());

        return userRepository.save(existing);
    }

    public void deleteOwner(Long id) {
        userRepository.deleteById(id);
    }
}