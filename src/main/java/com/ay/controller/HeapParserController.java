package com.ay.controller;

import java.io.File;
import java.util.HashMap;
import java.util.Map;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ay.service.HeapParserService;

@RestController
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

        return heapParserService.parseHeapDump(heapDumpFile);
    }
}