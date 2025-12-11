package com.tuempresa.agroecoalmacen.backend.controllers;

import com.tuempresa.agroecoalmacen.backend.models.Planta;
import com.tuempresa.agroecoalmacen.backend.repositories.PlantaRepository;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/plantas")
public class PlantaController {

    private final PlantaRepository plantaRepository;

    public PlantaController(PlantaRepository plantaRepository) {
        this.plantaRepository = plantaRepository;
    }

    // GET /api/plantas
    @GetMapping
    public List<Planta> listarPlantas() {
        return plantaRepository.findAll();
    }

    // GET /api/plantas/{id}
    @GetMapping("/{id}")
    public Planta obtenerPlanta(@PathVariable Long id) {
        Optional<Planta> planta = plantaRepository.findById(id);
        return planta.orElse(null); // Devuelve null si no existe
    }

    // POST /api/plantas
    @PostMapping
    public Planta crearPlanta(@RequestBody Planta planta) {
        return plantaRepository.save(planta);
    }

    // PUT /api/plantas/{id}
    @PutMapping("/{id}")
    public Planta actualizarPlanta(@PathVariable Long id, @RequestBody Planta plantaDatos) {
        return plantaRepository.findById(id).map(planta -> {
            planta.setNombre(plantaDatos.getNombre());
            return plantaRepository.save(planta);
        }).orElse(null);
    }

    // DELETE /api/plantas/{id}
    @DeleteMapping("/{id}")
    public String eliminarPlanta(@PathVariable Long id) {
        if (plantaRepository.existsById(id)) {
            plantaRepository.deleteById(id);
            return "Planta eliminada correctamente";
        } else {
            return "Planta no encontrada";
        }
    }
}
