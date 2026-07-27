package com.ay.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class WebSocketPublisher {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private JmxMonitorService jmxMonitorService;

    @Scheduled(fixedRate = 3000)
    public void publishMetrics() {

        System.out.println("Publishing JVM Metrics...");

        Map<String, Object> metrics = new HashMap<>();

        metrics.put("heap", jmxMonitorService.getHeapInfo());
        metrics.put("threads", jmxMonitorService.getThreadInfo());
        metrics.put("gc", jmxMonitorService.getGcInfo());

        System.out.println(metrics);
        messagingTemplate.convertAndSend("/topic/metrics", metrics);
    }
}