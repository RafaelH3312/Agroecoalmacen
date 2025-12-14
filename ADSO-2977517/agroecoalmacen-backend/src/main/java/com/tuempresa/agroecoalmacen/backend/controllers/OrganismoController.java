package com.tuempresa.agroecoalmacen.backend.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.lang.NonNull;
import com.tuempresa.agroecoalmacen.backend.services.organismoService; // Import correcto
import com.tuempresa.agroecoalmacen.backend.models.organismo;
import java.util.List;

@RestController
@RequestMapping("/organismos")
public class organismocontroller {

    private final organismoService service;

    public organismocontroller(organismoService service) {
        this.service = service;
    }

    @GetMapping
    public List<organismo> getAll() {
        return service.getAll();
    }

    @PutMapping("/{id}")
    public organismo update(
            @PathVariable @NonNull Long id,
            @RequestBody @NonNull organismo organismo
    ) {
        return service.update(id, organismo);
    }

    @PostMapping
    public organismo save(@RequestBody @NonNull organismo organismo) {
        return service.save(organismo);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable @NonNull Long id) {
        service.delete(id);
    }
}
