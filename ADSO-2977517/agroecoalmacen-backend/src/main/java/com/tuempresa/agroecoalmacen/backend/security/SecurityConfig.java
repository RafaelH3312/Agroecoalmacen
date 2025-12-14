package com.tuempresa.agroecoalmacen.backend.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            // Permitimos todas las rutas para simplificar desarrollo
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/**").permitAll()
            )
            // Deshabilitamos CSRF para pruebas con frontend
            .csrf(csrf -> csrf.disable())
            // Habilitamos CORS si necesitas desde frontend
            .cors(cors -> cors.disable());

        return http.build();
    }
}
