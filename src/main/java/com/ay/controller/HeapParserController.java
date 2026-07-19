package com.ay.controller;

import com.ay.service.HeapParserService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.util.Map;

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

        return heapParserService.parseHeapDump(heapDumpFile);
    }
}