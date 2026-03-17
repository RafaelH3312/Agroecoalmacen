package com.tuempresa.agroecoalmacen.dao;

import com.tuempresa.agroecoalmacen.backend.models.Usuario;
import com.tuempresa.agroecoalmacen.backend.util.Conexion;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import org.mindrot.jbcrypt.BCrypt;

public class UsuarioDAO {

    public UsuarioDAO() {
        // Inicializa admin si no existe
        crearAdminSiNoExiste();
    }

    // LOGIN con BCrypt
public Usuario login(String usuario, String password) {

    Usuario u = null;
    String sql = "SELECT * FROM usuarios WHERE usuario = ?";

    try (Connection con = Conexion.getConexion();
         PreparedStatement ps = con.prepareStatement(sql)) {

        ps.setString(1, usuario);
        ResultSet rs = ps.executeQuery();

        if (rs.next()) {

            boolean activo = rs.getBoolean("estado"); // ✅ ahora es boolean
            if (!activo) return null;

            String hashBD = rs.getString("password"); // ✅ nombre correcto

            if (BCrypt.checkpw(password, hashBD)) {
                u = new Usuario();
                u.setIdUsuario(rs.getInt("id_usuario")); // ✅ nombre correcto
                u.setUsuario(rs.getString("usuario"));   // ✅ nombre correcto
                u.setPassword(null);
                u.setRol(rs.getString("rol"));
                u.setEstado(activo);
            }
        }

    } catch (Exception e) {
        e.printStackTrace();
    }

    return u;
}

    // Crear usuario normal
    public boolean crearUsuario(String usuario, String password, String rol) {
    String sql = "INSERT INTO usuarios(usuario, password, rol, estado) VALUES (?, ?, ?, 1)";

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

    // Crear usuario admin si no existe
private void crearAdminSiNoExiste() {
    String sql = "SELECT * FROM usuarios WHERE usuario = 'admin'";

    try (Connection con = Conexion.getConexion();
         PreparedStatement ps = con.prepareStatement(sql)) {

        ResultSet rs = ps.executeQuery();

        if (!rs.next()) {
            crearUsuario("admin", "admin123", "admin");
            System.out.println("✅ Usuario admin creado");
        }

    } catch (Exception e) {
        e.printStackTrace();
    }
}
}