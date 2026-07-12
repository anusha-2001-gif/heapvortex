package com.ay.service;

import org.springframework.stereotype.Service;

import java.lang.management.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class JmxMonitorService {

    public MemoryInfo getHeapInfo() {
        MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();
        MemoryUsage heapUsage = memoryBean.getHeapMemoryUsage();

        MemoryInfo info = new MemoryInfo();
        info.setInit(heapUsage.getInit() / (1024 * 1024));
        info.setUsed(heapUsage.getUsed() / (1024 * 1024));
        info.setCommitted(heapUsage.getCommitted() / (1024 * 1024));
        info.setMax(heapUsage.getMax() / (1024 * 1024));

        return info;
    }

    public ThreadStatsInfo getThreadInfo() {
        ThreadMXBean threadBean = ManagementFactory.getThreadMXBean();

        ThreadStatsInfo info = new ThreadStatsInfo();
        info.setThreadCount(threadBean.getThreadCount());
        info.setPeakThreadCount(threadBean.getPeakThreadCount());
        info.setDaemonThreadCount(threadBean.getDaemonThreadCount());
        info.setTotalStartedThreadCount(threadBean.getTotalStartedThreadCount());

        return info;
    }

    public List<GcInfo> getGcInfo() {
        List<GarbageCollectorMXBean> gcBeans = ManagementFactory.getGarbageCollectorMXBeans();
        List<GcInfo> gcInfoList = new ArrayList<>();

        for (GarbageCollectorMXBean gcBean : gcBeans) {
            GcInfo info = new GcInfo();
            info.setName(gcBean.getName());
            info.setCollectionCount(gcBean.getCollectionCount());
            info.setCollectionTime(gcBean.getCollectionTime());
            gcInfoList.add(info);
        }

        return gcInfoList;
    }

    public static class MemoryInfo {
        private long init, used, committed, max;
        public long getInit() { return init; }
        public void setInit(long init) { this.init = init; }
        public long getUsed() { return used; }
        public void setUsed(long used) { this.used = used; }
        public long getCommitted() { return committed; }
        public void setCommitted(long committed) { this.committed = committed; }
        public long getMax() { return max; }
        public void setMax(long max) { this.max = max; }
    }

    public static class ThreadStatsInfo {
        private int threadCount, peakThreadCount, daemonThreadCount;
        private long totalStartedThreadCount;
        public int getThreadCount() { return threadCount; }
        public void setThreadCount(int threadCount) { this.threadCount = threadCount; }
        public int getPeakThreadCount() { return peakThreadCount; }
        public void setPeakThreadCount(int peakThreadCount) { this.peakThreadCount = peakThreadCount; }
        public int getDaemonThreadCount() { return daemonThreadCount; }
        public void setDaemonThreadCount(int daemonThreadCount) { this.daemonThreadCount = daemonThreadCount; }
        public long getTotalStartedThreadCount() { return totalStartedThreadCount; }
        public void setTotalStartedThreadCount(long totalStartedThreadCount) { this.totalStartedThreadCount = totalStartedThreadCount; }
    }

    public static class GcInfo {
        private String name;
        private long collectionCount, collectionTime;
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public long getCollectionCount() { return collectionCount; }
        public void setCollectionCount(long collectionCount) { this.collectionCount = collectionCount; }
        public long getCollectionTime() { return collectionTime; }
        public void setCollectionTime(long collectionTime) { this.collectionTime = collectionTime; }
    }
}