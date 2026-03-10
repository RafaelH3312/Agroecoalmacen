package com.tuempresa.agroecoalmacen.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

import com.tuempresa.agroecoalmacen.backend.models.Organismo;

public class OrganismoDAO {

    private Connection connection;

    public OrganismoDAO(Connection connection) {
        this.connection = connection;
    }

    public boolean insertarOrganismo(String nombreComun) {
        String sql = "INSERT INTO organismos (nombre_comun) VALUES (?)";
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, nombreComun);
            stmt.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    public List<Organismo> listarOrganismos() {
        List<Organismo> lista = new ArrayList<>();
        String sql = "SELECT * FROM organismos";

        try (PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Organismo o = new Organismo();
                o.setId(rs.getLong("id"));
                o.setNombre_comun(rs.getString("nombre_comun"));
                lista.add(o);
            }

        } catch (SQLException e) {
            e.printStackTrace();
        }
        return lista;
    }
}
