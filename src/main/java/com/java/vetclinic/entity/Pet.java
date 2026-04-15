package com.java.vetclinic.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pet")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Pet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String breed;
    private Integer age;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    private User user;
}