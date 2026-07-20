package com.ay.controller;

import com.ay.service.HeapParserService;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.Map;

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

        File heapDumpFile = new File("heapdumps/heapdump_20260720_105215.hprof");

        return heapParserService.parseHeapDump(heapDumpFile);
    }
}