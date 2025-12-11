package com.tuempresa.agroecoalmacen.backend.models;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class Organismo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nombre_comun;
    private String nombre_cientifico;
    private String tipo;
    private LocalDate fecha_ingreso;
    private String ubicacion;
    private String estado;

    // Getters y setters completos
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre_comun() { return nombre_comun; }
    public void setNombre_comun(String nombre_comun) { this.nombre_comun = nombre_comun; }

    public String getNombre_cientifico() { return nombre_cientifico; }
    public void setNombre_cientifico(String nombre_cientifico) { this.nombre_cientifico = nombre_cientifico; }

    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public LocalDate getFecha_ingreso() { return fecha_ingreso; }
    public void setFecha_ingreso(LocalDate fecha_ingreso) { this.fecha_ingreso = fecha_ingreso; }

    public String getUbicacion() { return ubicacion; }
    public void setUbicacion(String ubicacion) { this.ubicacion = ubicacion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}
