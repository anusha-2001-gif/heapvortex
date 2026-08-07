package com.ay.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import com.ay.service.HeapParserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ay.service.HeapParserService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/api/parser")
public class HeapParserController {

    private final HeapParserService heapParserService;

    public HeapParserController(HeapParserService heapParserService) {
        this.heapParserService = heapParserService;
    }

    @GetMapping("/parse")
    public Map<String, Object> parseHeapDump() {

     
        File heapDumpFile = new File("heapdumps/heapdump_20260718_121504.hprof");
        
        if (!heapDumpFile.exists()) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", "Heap dump file not found.");
            error.put("path", heapDumpFile.getAbsolutePath());
            return error;
        }

        if (heapDumpFile.length() == 0) {
            Map<String, Object> error = new HashMap<>();
            error.put("status", "error");
            error.put("message", "Heap dump file is empty.");
            return error;
        }
        
        
        return heapParserService.parseHeapDump(heapDumpFile);
    }
}