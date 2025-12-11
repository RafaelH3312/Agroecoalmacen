package com.tuempresa.agroecoalmacen.backend.services;

import com.tuempresa.agroecoalmacen.backend.models.Organismo;
import com.tuempresa.agroecoalmacen.backend.repositories.OrganismoRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class OrganismoService {

    private final OrganismoRepository repository;

    public OrganismoService(OrganismoRepository repository) {
        this.repository = repository;
    }

    public List<Organismo> findAll() {
        return repository.findAll();
    }
}
