package com.java.vetclinic.service;

import com.java.vetclinic.entity.Service;
import com.java.vetclinic.repository.ServiceRepository;

import java.util.List;

@org.springframework.stereotype.Service
public class ServiceService {

    private final ServiceRepository serviceRepository;

    public ServiceService(ServiceRepository serviceRepository) {
        this.serviceRepository = serviceRepository;
    }

    public List<Service> getAllServices() {
        return serviceRepository.findAll();
    }

    public Service getServiceById(Long id) {
        return serviceRepository.findById(id).orElse(null);
    }

    public Service createService(Service service) {
        return serviceRepository.save(service);
    }

    public Service updateService(Long id, Service updatedService) {
        Service existing = serviceRepository.findById(id).orElse(null);
        if (existing == null) {
            return null;
        }

        existing.setName(updatedService.getName());
        existing.setDescription(updatedService.getDescription());
        existing.setPrice(updatedService.getPrice());

        return serviceRepository.save(existing);
    }

    public void deleteService(Long id) {
        serviceRepository.deleteById(id);
    }
}