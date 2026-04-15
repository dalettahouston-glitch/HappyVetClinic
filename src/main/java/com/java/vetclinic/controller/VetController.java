package com.java.vetclinic.controller;

import com.java.vetclinic.entity.Vet;
import com.java.vetclinic.service.VetService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/vets")
public class VetController {

    private final VetService vetService;

    public VetController(VetService vetService) {
        this.vetService = vetService;
    }

    @GetMapping
    public List<Vet> getAllVets() {
        return vetService.getAllVets();
    }

    @PostMapping
    public Vet createVet(@RequestBody Vet vet) {
        return vetService.createVet(vet);
    }
}