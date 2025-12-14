package com.tuempresa.agroecoalmacen.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "organismos") // nombre de la tabla en MySQL
public class organismo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre_comun;
    private String tipo;
    private String fecha_ingreso;
    private String ubicacion;
    private String estado;
    private String temp;
    private String luz;
    private String img;

    public organismo() {} // constructor vacío obligatorio para JPA

    public organismo(Long id, String nombre_comun, String tipo, String fecha_ingreso,
                     String ubicacion, String estado, String temp, String luz, String img) {
        this.id = id;
        this.nombre_comun = nombre_comun;
        this.tipo = tipo;
        this.fecha_ingreso = fecha_ingreso;
        this.ubicacion = ubicacion;
        this.estado = estado;
        this.temp = temp;
        this.luz = luz;
        this.img = img;
    }

    // Getters y setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre_comun() { return nombre_comun; }
    public void setNombre_comun(String nombre_comun) { this.nombre_comun = nombre_comun; }

    
    public String getTipo() { return tipo; }
    public void setTipo(String tipo) { this.tipo = tipo; }

    public String getFecha_ingreso() { return fecha_ingreso; }
    public void setFecha_ingreso(String fecha_ingreso) { this.fecha_ingreso = fecha_ingreso; }

    public String getUbicacion() { return ubicacion; }
    public void setUbicacion(String ubicacion) { this.ubicacion = ubicacion; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public String getTemp() { return temp; }
    public void setTemp(String temp) { this.temp = temp; }

    public String getLuz() { return luz; }
    public void setLuz(String luz) { this.luz = luz; }

    public String getImg() { return img; }
    public void setImg(String img) { this.img = img; }
}
