package com.tuempresa.agroecoalmacen.backend.repositories;

import com.tuempresa.agroecoalmacen.backend.models.organismo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface organismorepository extends JpaRepository<organismo, Long> {
}
