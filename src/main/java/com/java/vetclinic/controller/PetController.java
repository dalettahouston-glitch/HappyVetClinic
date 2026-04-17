package com.java.vetclinic.controller;

import com.java.vetclinic.entity.Pet;
import com.java.vetclinic.service.PetService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pets")
public class PetController {

    private final PetService petService;

    public PetController(PetService petService) {
        this.petService = petService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public List<Pet> getAllPets() {
        return petService.getAllPets();
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public Pet getPetById(@PathVariable Long id) {
        return petService.getPetById(id);
    }

    @PostMapping("/owner/{ownerId}")
    @PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public Pet createPet(@PathVariable Long ownerId, @RequestBody Pet pet) {
        return petService.createPet(ownerId, pet);
    }

    @PutMapping("/{id}")@PreAuthorize("hasRole('ADMIN') or #id == authentication.principal.id")
    public Pet updatePet(@PathVariable Long id, @RequestBody Pet pet) {
        return petService.updatePet(id, pet);
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public void deletePet(@PathVariable Long id) {
        petService.deletePet(id);
    }
}