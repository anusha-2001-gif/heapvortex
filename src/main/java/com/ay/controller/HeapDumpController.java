package com.ay.controller;

import com.ay.service.HeapDumpService;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/heapdump")
public class HeapDumpController {

    private final HeapDumpService heapDumpService;

 
    public HeapDumpController(HeapDumpService heapDumpService) {
        this.heapDumpService = heapDumpService;
    }

   
    @PostMapping("/generate")
    public ResponseEntity<String> generateDump() {
        try {
            String path = heapDumpService.generateHeapDump();
            return ResponseEntity.ok("Heap dump created successfully: " + path);
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body("Error generating heap dump: " + e.getMessage());
        }
    }

   
    @GetMapping("/list")
    public ResponseEntity<List<String>> listDumps() {
        File[] files = heapDumpService.listHeapDumps();
        List<String> names = Arrays.stream(files)
                .map(File::getName)
                .collect(Collectors.toList());
        return ResponseEntity.ok(names);
    }

     
    @GetMapping("/download/{fileName}")
    public ResponseEntity<Resource> downloadDump(@PathVariable String fileName) {
        File file = heapDumpService.getHeapDumpFile(fileName);

        if (!file.exists()) {
            return ResponseEntity.notFound().build();
        }

        Resource resource = new FileSystemResource(file);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + fileName + "\"")
                .contentType(MediaType.APPLICATION_OCTET_STREAM)
                .body(resource);
    }
}