package com.ay.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class LiveMetricsStreamer {

    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @Autowired
    private JmxMonitorService jmxMonitorService;

    @Scheduled(fixedRate = 2000)
    public void streamLiveMetrics() {
        JmxMonitorService.MemoryInfo heapInfo = jmxMonitorService.getHeapInfo();
        JmxMonitorService.ThreadStatsInfo threadInfo = jmxMonitorService.getThreadInfo();
        List<JmxMonitorService.GcInfo> gcInfo = jmxMonitorService.getGcInfo();

        JvmMetricsDTO metrics = new JvmMetricsDTO(heapInfo, threadInfo, gcInfo, System.currentTimeMillis());

        messagingTemplate.convertAndSend("/topic/jvm-metrics-structured", metrics);
    }
}
