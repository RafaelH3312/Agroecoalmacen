package com.tuempresa.agroecoalmacen.backend.controllers;

import com.tuempresa.agroecoalmacen.dao.UsuarioDAO;
import com.tuempresa.agroecoalmacen.backend.models.Usuario;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.*;
import java.io.IOException;
import java.io.PrintWriter;

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

        try (PrintWriter out = response.getWriter()) {
            String usuario = request.getParameter("usuario");
            String clave = request.getParameter("password");

            // 🔍 Debug
            System.out.println("Intento login USER: " + usuario);

            Usuario user = usuarioDAO.login(usuario, clave);

            if (user != null) {
                // Crear sesión
                HttpSession session = request.getSession(true);
                session.setAttribute("usuario", user.getUsuario());
                session.setAttribute("rol", user.getRol());
                session.setMaxInactiveInterval(30 * 60); // 5 min

                // Responder OK al frontend
                out.print("{\"ok\": true, \"rol\": \"" + user.getRol() + "\"}");
            } else {
                out.print("{\"ok\": false, \"mensaje\": \"Usuario o contraseña incorrectos\"}");
            }

            out.flush();

        } catch (Exception e) {
            e.printStackTrace();
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
        }
    }

    // Manejo de OPTIONS para CORS
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
        response.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setHeader("Access-Control-Allow-Credentials", "true");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}