package com.tuempresa.agroecoalmacen.backend.services;

import org.springframework.lang.NonNull;
import org.springframework.stereotype.Service;
import com.tuempresa.agroecoalmacen.backend.repositories.organismorepository;
import com.tuempresa.agroecoalmacen.backend.models.organismo;
import java.util.List;

@Service
public class organismoService {
    private final organismorepository repository;

    public organismoService(@NonNull organismorepository repository) {
        this.repository = repository;
    }

    public List<organismo> getAll() {
        return repository.findAll();
    }

    public organismo update(@NonNull Long id, @NonNull organismo updated) {
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

    public organismo save(@NonNull organismo organismo) {
        return repository.save(organismo);
    }

    public void delete(@NonNull Long id) {
        repository.deleteById(id);
    }
}
