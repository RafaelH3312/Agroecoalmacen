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

        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");

        PrintWriter out = response.getWriter();

        try {
            String usuario = request.getParameter("usuario");
            String clave = request.getParameter("clave");

            Usuario user = usuarioDAO.login(usuario, clave);

            if (user != null) {
                HttpSession session = request.getSession(true);
                session.setAttribute("usuario", user);
                out.print("{\"ok\": true}");
            } else {
                out.print("{\"ok\": false, \"mensaje\": \"Usuario o contraseña incorrectos\"}");
            }

        } catch (Exception e) {
            e.printStackTrace();
            out.print("{\"ok\": false, \"mensaje\": \"Error interno del servidor\"}");
        }
    }
}
