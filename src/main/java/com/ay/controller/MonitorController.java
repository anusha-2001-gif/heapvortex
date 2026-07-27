package com.ay.controller;

import com.ay.service.JmxMonitorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class MonitorController {

    @Autowired
    private JmxMonitorService jmxMonitorService;

    @GetMapping("/api/heap")
    public JmxMonitorService.MemoryInfo getHeapInfo() {
        return jmxMonitorService.getHeapInfo();
    }

    @GetMapping("/api/threads")
    public JmxMonitorService.ThreadStatsInfo getThreadInfo() {
        return jmxMonitorService.getThreadInfo();
    }

    @GetMapping("/api/gc")
    public List<JmxMonitorService.GcInfo> getGcInfo() {
        return jmxMonitorService.getGcInfo();
    }
}