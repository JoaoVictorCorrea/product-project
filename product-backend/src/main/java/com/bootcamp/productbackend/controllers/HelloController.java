package com.bootcamp.productbackend.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloController {

    @GetMapping("hello")
    public String getHello() {
        
        return "Hello Spring Boot";
    }
}
