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

@RestController
public class CategoryController {
    
    private List<Category> categories = Arrays.asList(new Category(1, "Produção Própria"), 
                                                      new Category(2, "Nacional"), 
                                                      new Category(3, "Importado")
    );
    
    @GetMapping("categories/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable int id) {

        Category category = categories.stream()
                                  .filter(c -> c.getId() == id)
                                  .findFirst()
                                  .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Category not found"));
                                  
        return ResponseEntity.ok(category);
    }
    
    @GetMapping("categories")
    public List<Category> getCategories() {

        return categories;
    }
}
