package com.java.vetclinic.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "owner")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String firstName;
    private String lastName;
    private String phone;
    private String email;
}