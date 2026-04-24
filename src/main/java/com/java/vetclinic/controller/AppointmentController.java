package com.java.vetclinic.controller;

import com.java.vetclinic.entity.Appointment;
import com.java.vetclinic.entity.User;
import com.java.vetclinic.entity.Pet;
import com.java.vetclinic.entity.Vet;
import com.java.vetclinic.repository.AppointmentRepository;
import com.java.vetclinic.repository.UserRepository;
import com.java.vetclinic.repository.PetRepository;
import com.java.vetclinic.repository.VetRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin(origins = "http://localhost:5173")
public class AppointmentController {

    private final AppointmentRepository appointmentRepository;
    private final UserRepository userRepository;
    private final PetRepository petRepository;
    private final VetRepository vetRepository;

    public AppointmentController(AppointmentRepository appointmentRepository,
                                 UserRepository userRepository,
                                 PetRepository petRepository,
                                 VetRepository vetRepository) {
        this.appointmentRepository = appointmentRepository;
        this.userRepository = userRepository;
        this.petRepository = petRepository;
        this.vetRepository = vetRepository;
    }

    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        return ResponseEntity.ok(appointmentRepository.findAll());
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<List<Appointment>> getAppointmentsByUser(@PathVariable Long userId) {
        return ResponseEntity.ok(appointmentRepository.findByUser_Id(userId));
    }

    @PostMapping
    public ResponseEntity<Appointment> createAppointment(@RequestParam Long ownerId,
                                                         @RequestParam Long petId,
                                                         @RequestParam Long vetId,
                                                         @RequestBody Appointment appointment) {
        User user = userRepository.findById(ownerId).orElse(null);
        Pet pet = petRepository.findById(petId).orElse(null);
        Vet vet = vetRepository.findById(vetId).orElse(null);

        appointment.setUser(user);
        appointment.setPet(pet);
        appointment.setVet(vet);

        return ResponseEntity.ok(appointmentRepository.save(appointment));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAppointment(@PathVariable Long id) {
        appointmentRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}