package com.tuempresa.agroecoalmacen.backend.controllers;

import com.tuempresa.agroecoalmacen.backend.models.Organismo;
import com.tuempresa.agroecoalmacen.backend.services.OrganismoService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;
/**
 * Controlador REST para gestionar organismos del inventario
 */
@RestController
public class OrganismoController {

    private final OrganismoService service;

    public OrganismoController(OrganismoService service) {
        this.service = service;
    }

    @GetMapping("/organismo")
    public List<Organismo> getAllOrganismos() {
        List<Organismo> organismos = service.findAll();

        if (organismos.isEmpty()) {
            // Si la DB está vacía, devolvemos datos de ejemplo
            Organismo o1 = new Organismo();
            o1.setId(1L);
            o1.setNombre_comun("Suculenta Echeveria");
            o1.setNombre_cientifico("Echeveria Iris");
            o1.setTipo("Planta");
            o1.setFecha_ingreso(LocalDate.of(2025, 12, 11));
            o1.setUbicacion("Invernadero 1");
            o1.setEstado("Saludable");

            Organismo o2 = new Organismo();
            o2.setId(2L);
            o2.setNombre_comun("Santa Marta Gold");
            o2.setNombre_cientifico("Crassula Ovata");
            o2.setTipo("Planta");
            o2.setFecha_ingreso(LocalDate.of(2025, 12, 10));
            o2.setUbicacion("Invernadero 2");
            o2.setEstado("Exceso luminoso");

            return Arrays.asList(o1, o2);
        }

        return organismos;
    }
}
