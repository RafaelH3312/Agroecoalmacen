package com.tuempresa.agroecoalmacen.backend.controllers;

import com.tuempresa.agroecoalmacen.backend.models.Organismo;
import com.tuempresa.agroecoalmacen.backend.services.OrganismoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/organismo")
public class OrganismoController {

    private final OrganismoService service;

    public OrganismoController(OrganismoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Organismo> getAllOrganismos() {
        return service.findAll();
    }

    @GetMapping("/{id}")
    public Organismo getOrganismoById(@PathVariable Long id) {
        return service.findById(id);
    }

    @PostMapping
    public Organismo createOrganismo(@RequestBody Organismo organismo) {
        return service.save(organismo);
    }

    @PutMapping("/{id}")
    public Organismo updateOrganismo(@PathVariable Long id, @RequestBody Organismo body) {
        return service.update(id, body);
    }

    @DeleteMapping("/{id}")
    public void deleteOrganismo(@PathVariable Long id) {
        service.delete(id);
    }
}
