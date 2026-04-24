package com.java.vetclinic.repository;

import com.java.vetclinic.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PetRepository extends JpaRepository<Pet, Long> {
    List<Pet> findByUser_Id(Long userId);
}