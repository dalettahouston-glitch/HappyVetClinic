package com.java.vetclinic.service;

import com.java.vetclinic.entity.User;
import com.java.vetclinic.entity.Pet;
import com.java.vetclinic.repository.UserRepository;
import com.java.vetclinic.repository.PetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PetService {

    private final PetRepository petRepository;
    private final UserRepository userRepository;

    public PetService(PetRepository petRepository, UserRepository userRepository) {
        this.petRepository = petRepository;
        this.userRepository = userRepository;
    }

    public List<Pet> getAllPets() {
        return petRepository.findAll();
    }

    public List<Pet> getPetsByOwner(Long ownerId) {
        return petRepository.findByUser_Id(ownerId);
    }

    public Pet getPetById(Long id) {
        return petRepository.findById(id).orElse(null);
    }

    public Pet createPet(Long ownerId, Pet pet) {
        User user = userRepository.findById(ownerId).orElse(null);
        if (user == null) {
            return null;
        }
        pet.setUser(user);
        return petRepository.save(pet);
    }

    public Pet updatePet(Long id, Pet updatedPet) {
        Pet existing = petRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }
        existing.setName(updatedPet.getName());
        existing.setType(updatedPet.getType());
        existing.setBreed(updatedPet.getBreed());
        existing.setAge(updatedPet.getAge());
        return petRepository.save(existing);
    }

    public void deletePet(Long id) {
        petRepository.deleteById(id);
    }
}