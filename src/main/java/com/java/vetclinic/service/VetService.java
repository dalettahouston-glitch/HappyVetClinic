package com.java.vetclinic.service;

import com.java.vetclinic.entity.Vet;
import com.java.vetclinic.repository.VetRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VetService {

    private final VetRepository vetRepository;

    public VetService(VetRepository vetRepository) {
        this.vetRepository = vetRepository;
    }

    public List<Vet> getAllVets() {
        return vetRepository.findAll();
    }

    public Vet createVet(Vet vet) {
        return vetRepository.save(vet);
    }
}