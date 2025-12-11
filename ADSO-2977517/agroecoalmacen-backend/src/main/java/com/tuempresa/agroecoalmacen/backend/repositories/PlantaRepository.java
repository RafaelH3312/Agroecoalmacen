package com.tuempresa.agroecoalmacen.backend.repositories;

import com.tuempresa.agroecoalmacen.backend.models.Planta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PlantaRepository extends JpaRepository<Planta, Long> {}
