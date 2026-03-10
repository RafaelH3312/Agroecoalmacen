package com.tuempresa.agroecoalmacen.backend.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.lang.NonNull;
import com.tuempresa.agroecoalmacen.backend.services.OrganismoService; // Import correcto
import com.tuempresa.agroecoalmacen.backend.models.Organismo;
import java.util.List;

@RestController
@RequestMapping("/organismos")
public class OrganismoController {

    private final OrganismoService service;

    public OrganismoController(OrganismoService service) {
        this.service = service;
    }

    @GetMapping
    public List<Organismo> getAll() {
        return service.getAll();
    }

    @PutMapping("/{id}")
    public Organismo update(
            @PathVariable @NonNull Long id,
            @RequestBody @NonNull Organismo organismo
    ) {
        return service.update(id, organismo);
    }

    @PostMapping
    public Organismo save(@RequestBody @NonNull Organismo organismo) {
        return service.save(organismo);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable @NonNull Long id) {
        service.delete(id);
    }
}
