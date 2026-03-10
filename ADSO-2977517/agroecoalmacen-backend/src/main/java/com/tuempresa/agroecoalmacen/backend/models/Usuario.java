package com.tuempresa.agroecoalmacen.backend.models;

public class Usuario {

    private int idUsuario;
    private String usuario;
    private String password;
    private String rol;
    private boolean estado;

    public Usuario() {
    }

    public Usuario(int idUsuario, String usuario, String password, String rol, boolean estado) {
        this.idUsuario = idUsuario;
        this.usuario = usuario;
        this.password = password;
        this.rol = rol;
        this.estado = estado;
    }

    public int getIdUsuario() {
        return idUsuario;
    }

    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }

    public String getUsuario() {
        return usuario;
    }

    public void setUsuario(String usuario) {
        this.usuario = usuario;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRol() {
        return rol;
    }

    public void setRol(String rol) {
        this.rol = rol;
    }

    public boolean isEstado() {
        return estado;
    }

    public void setEstado(boolean estado) {
        this.estado = estado;
    }
}
