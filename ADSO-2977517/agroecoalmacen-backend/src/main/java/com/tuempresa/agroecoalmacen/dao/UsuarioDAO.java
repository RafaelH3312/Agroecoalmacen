package com.tuempresa.agroecoalmacen.dao;

import com.tuempresa.agroecoalmacen.backend.models.Usuario;
import com.tuempresa.agroecoalmacen.backend.util.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.mindrot.jbcrypt.BCrypt;

public class UsuarioDAO {

    public Usuario login(String usuario, String password) {

        Usuario u = null;
        String sql = "SELECT * FROM cuentas WHERE nombre_usuario = ?";

        try (Connection con = Conexion.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setString(1, usuario);
            ResultSet rs = ps.executeQuery();

            if (rs.next()) {
                boolean activo = rs.getString("estado").equalsIgnoreCase("activo");
                if (!activo) {
                    return null; // Usuario inactivo
                }

                String hashBD = rs.getString("contrasena");
                if (BCrypt.checkpw(password, hashBD)) {
                    u = new Usuario();
                    u.setIdUsuario(rs.getInt("id"));
                    u.setUsuario(rs.getString("nombre_usuario"));
                    u.setPassword(hashBD); // opcional: puedes setear null por seguridad
                    u.setRol(rs.getString("rol"));
                    u.setEstado(activo);
                }
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

        return u;
    }

    // Método para crear usuario con contraseña hasheada
    public boolean crearUsuario(String usuario, String password, String rol) {
        String sql = "INSERT INTO cuentas(nombre_usuario, contrasena, rol, estado) VALUES (?, ?, ?, 'activo')";
        try (Connection con = Conexion.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {

            String hash = BCrypt.hashpw(password, BCrypt.gensalt());
            ps.setString(1, usuario);
            ps.setString(2, hash);
            ps.setString(3, rol);

            return ps.executeUpdate() > 0;

        } catch (Exception e) {
            e.printStackTrace();
        }

        return false;
    }
}
