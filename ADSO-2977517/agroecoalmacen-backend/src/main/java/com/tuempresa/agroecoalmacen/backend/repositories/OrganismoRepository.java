package com.tuempresa.agroecoalmacen.backend.repositories;

import com.tuempresa.agroecoalmacen.backend.models.Organismo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrganismoRepository extends JpaRepository<Organismo, Long> {
}
