package com.tuempresa.agroecoalmacen.backend.controllers;

import com.tuempresa.agroecoalmacen.dao.UsuarioDAO;
import com.tuempresa.agroecoalmacen.backend.models.Usuario;
import com.tuempresa.agroecoalmacen.backend.util.Conexion;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.PreparedStatement;

@WebServlet("/login")
public class LoginServlet extends HttpServlet {

    private UsuarioDAO usuarioDAO = new UsuarioDAO();

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        // Permitir CORS para Next.js
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();

        try {
            String usuario = request.getParameter("usuario");
            String clave = request.getParameter("password"); // 🔥 CORREGIDO

            // 🔍 DEBUG
            System.out.println("USER: " + usuario);
            System.out.println("PASS: " + clave);

            Usuario user = usuarioDAO.login(usuario, clave);

            if (user != null) {
                // Crear sesión
                HttpSession session = request.getSession(true);
                session.setAttribute("usuario", user.getUsuario());
                session.setAttribute("rol", user.getRol());
                session.setMaxInactiveInterval(30 * 60); // 30 min

                // Registrar acción
                // registrarAccion(user.getIdUsuario(), "Login exitoso");

                out.print("{\"ok\": true, \"rol\": \"" + user.getRol() + "\"}");
            } else {
                out.print("{\"ok\": false, \"mensaje\": \"Usuario o contraseña incorrectos\"}");
            }

            out.flush(); // 🔥 IMPORTANTE

        } catch (Exception e) {
            e.printStackTrace();
            out.print("{\"ok\": false, \"mensaje\": \"Error interno del servidor\"}");
            out.flush();
        }
    }

    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {

        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }

    // Registrar acciones en la tabla registro_acciones
    private void registrarAccion(int idUsuario, String accion) {
        String sql = "INSERT INTO registro_acciones (id_cuenta, accion) VALUES (?, ?)";

        try (Connection con = Conexion.getConexion();
             PreparedStatement ps = con.prepareStatement(sql)) {

            ps.setInt(1, idUsuario);
            ps.setString(2, accion);
            ps.executeUpdate();

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}