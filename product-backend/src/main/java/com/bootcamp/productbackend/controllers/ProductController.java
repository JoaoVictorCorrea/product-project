package com.bootcamp.productbackend.controllers;

import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.bootcamp.productbackend.models.Category;
import com.bootcamp.productbackend.models.Product;

@RestController
public class ProductController {

    private List<Product> products = Arrays.asList(
        new Product(1, "Product 01", "Teste 01", 100.50, new Category(1, "Produção Própria"), true, false), 
        new Product(2, "Product 02", "Teste 02", 200.50, new Category(2, "Nacional"), false, true), 
        new Product(3, "Product 03", "Teste 03", 300.50, new Category(3, "Importado"), true, true)
    );
    
    @GetMapping("products/{id}")
    public ResponseEntity<Product> getProduct(@PathVariable int id) {

        Product product = products.stream()
                                  .filter(p -> p.getId() == id)
                                  .findFirst()
                                  .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Product not found"));
                                  
        return ResponseEntity.ok(product);
    }
    
    @GetMapping("products")
    public List<Product> getProducts() {

        return products;
    }
}
