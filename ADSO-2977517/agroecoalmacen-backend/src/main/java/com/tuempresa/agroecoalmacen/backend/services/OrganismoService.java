package com.tuempresa.agroecoalmacen.backend.services;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import com.tuempresa.agroecoalmacen.backend.repositories.OrganismoRepository;
import com.tuempresa.agroecoalmacen.backend.models.Organismo;
import java.util.List;

@Service
public class OrganismoService {
    private final OrganismoRepository repository;

    public OrganismoService(@NonNull OrganismoRepository repository) {
        this.repository = repository;
    }

    public List<Organismo> getAll() {
        return repository.findAll();
    }

    public Organismo update(@NonNull Long id, @NonNull Organismo updated) {
        return repository.findById(id)
                .map(org -> {
                    org.setNombre_comun(updated.getNombre_comun());
                    org.setTipo(updated.getTipo());
                    org.setFecha_ingreso(updated.getFecha_ingreso());
                    org.setUbicacion(updated.getUbicacion());
                    org.setEstado(updated.getEstado());
                    org.setTemp(updated.getTemp());
                    org.setLuz(updated.getLuz());
                    org.setImg(updated.getImg());
                    return repository.save(org);
                }).orElseThrow(() -> new RuntimeException("Organismo no encontrado"));
    }

    public Organismo save(@NonNull Organismo organismo) {
        return repository.save(organismo);
    }

    public void delete(@NonNull Long id) {
        repository.deleteById(id);
    }
}
