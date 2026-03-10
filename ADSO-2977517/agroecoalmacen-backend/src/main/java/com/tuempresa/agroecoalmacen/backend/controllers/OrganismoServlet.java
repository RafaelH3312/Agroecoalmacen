package com.tuempresa.agroecoalmacen.backend.controllers;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

import com.tuempresa.agroecoalmacen.dao.OrganismoDAO;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@WebServlet("/guardarOrganismo")
public class OrganismoServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {

        String nombre = request.getParameter("nombre");

        try (Connection conn = DriverManager.getConnection(
                "jdbc:mysql://localhost:3306/agroecoalmacen", "usuario", "password")) {
            
            OrganismoDAO dao = new OrganismoDAO(conn);
            dao.insertarOrganismo(nombre);

        } catch (SQLException e) {
            e.printStackTrace();
        }

        response.sendRedirect("listarOrganismos.jsp"); // o donde quieras redirigir
    }
}
