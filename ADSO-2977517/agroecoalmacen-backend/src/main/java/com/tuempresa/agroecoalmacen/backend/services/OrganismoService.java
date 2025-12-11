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

    // LISTAR TODOS
    public List<Organismo> findAll() {
        return repository.findAll();
    }

    // BUSCAR UNO POR ID
    public Organismo findById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // CREAR
    public Organismo save(Organismo organismo) {
        return repository.save(organismo);
    }

    // ACTUALIZAR
    public Organismo update(Long id, Organismo body) {
        Organismo o = repository.findById(id).orElse(null);
        if (o == null) return null;

        o.setNombre_comun(body.getNombre_comun());
        o.setNombre_cientifico(body.getNombre_cientifico());
        o.setTipo(body.getTipo());
        o.setFecha_ingreso(body.getFecha_ingreso());
        o.setUbicacion(body.getUbicacion());
        o.setEstado(body.getEstado());

        return repository.save(o);
    }

    // ELIMINAR
    public void delete(Long id) {
        repository.deleteById(id);
    }
}
