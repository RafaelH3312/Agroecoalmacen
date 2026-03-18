package com.tuempresa.agroecoalmacen.backend.controllers;

import com.tuempresa.agroecoalmacen.backend.models.Organismo;
import com.tuempresa.agroecoalmacen.backend.services.OrganismoService;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.lang.NonNull;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/organismos")
@EnableWebMvc
public class OrganismoController {

    private final OrganismoService service;

    public OrganismoController(OrganismoService service) {
        this.service = service;
    }

    // ===============================
    // CRUD Organismos
    // ===============================
    @GetMapping
    public List<Organismo> getAll() {
        return service.getAll();
    }

    @PostMapping
    public Organismo save(@RequestBody @NonNull Organismo organismo) {
        return service.save(organismo);
    }

    @PutMapping("/{id}")
    public Organismo update(@PathVariable @NonNull Long id, @RequestBody @NonNull Organismo organismo) {
        return service.update(id, organismo);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable @NonNull Long id) {
        service.delete(id);
    }

    // ===============================
    // Logout
    // ===============================
    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletRequest request) {
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        return ResponseEntity.ok().body("{\"ok\": true}");
    }

    // ===============================
    // Subir imagen
    // ===============================
    @PostMapping("/upload")
    public ResponseEntity<?> subirImagen(@RequestParam("file") MultipartFile file) {
        try {
            // Carpeta donde se guardan las imágenes
            String carpeta = "uploads/";
            File dir = new File(carpeta);
            if (!dir.exists()) {
                dir.mkdirs(); // crea carpeta si no existe
            }

            // Guardar archivo
String nombreArchivo = System.currentTimeMillis() + "_" + file.getOriginalFilename();
File destino = new File(carpeta + nombreArchivo);
file.transferTo(destino);

            // Retorna solo el nombre del archivo
            return ResponseEntity.ok().body(nombreArchivo);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error al subir la imagen");
        }
    }
}