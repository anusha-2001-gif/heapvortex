package com.ay.controller;

import java.util.Map;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ay.service.JmxMemoryService;

@RestController
@RequestMapping("/api/jmx")
@CrossOrigin(origins = "*")
public class JmxMemoryController {

    private final JmxMemoryService service;

    public JmxMemoryController(JmxMemoryService service) {
        this.service = service;
    }

    @GetMapping("/memory")
    public Map<String, Object> getMemory() {
        return service.getMemoryInfo();
    }
}