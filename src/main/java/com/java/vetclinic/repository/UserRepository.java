package com.java.vetclinic.repository;

import com.java.vetclinic.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
}