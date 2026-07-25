package com.ay.service;

import java.util.List;

public class JvmMetricsDTO {

    private JmxMonitorService.MemoryInfo memoryInfo;
    private JmxMonitorService.ThreadStatsInfo threadStatsInfo;
    private List<JmxMonitorService.GcInfo> gcInfoList;
    private long timestamp;

    public JvmMetricsDTO(JmxMonitorService.MemoryInfo memoryInfo,
                          JmxMonitorService.ThreadStatsInfo threadStatsInfo,
                          List<JmxMonitorService.GcInfo> gcInfoList,
                          long timestamp) {
        this.memoryInfo = memoryInfo;
        this.threadStatsInfo = threadStatsInfo;
        this.gcInfoList = gcInfoList;
        this.timestamp = timestamp;
    }

    public JmxMonitorService.MemoryInfo getMemoryInfo() {
        return memoryInfo;
    }

    public JmxMonitorService.ThreadStatsInfo getThreadStatsInfo() {
        return threadStatsInfo;
    }

    public List<JmxMonitorService.GcInfo> getGcInfoList() {
        return gcInfoList;
    }

    public long getTimestamp() {
        return timestamp;
    }
}