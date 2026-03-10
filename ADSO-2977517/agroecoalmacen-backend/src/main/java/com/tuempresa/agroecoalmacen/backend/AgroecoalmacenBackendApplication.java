package com.tuempresa.agroecoalmacen.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.ServletComponentScan;

@SpringBootApplication
@ServletComponentScan
public class AgroecoalmacenBackendApplication {

    public static void main(String[] args) {
        SpringApplication.run(AgroecoalmacenBackendApplication.class, args);
    }
}
