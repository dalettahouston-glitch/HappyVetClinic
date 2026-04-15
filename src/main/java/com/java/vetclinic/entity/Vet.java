package com.java.vetclinic.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "vet")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String specialty;
}