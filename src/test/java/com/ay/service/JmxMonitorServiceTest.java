package com.ay.service;

import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.Test;

class JmxMonitorServiceTest {

	private final JmxMonitorService service = new JmxMonitorService();
    @Test
    void getHeapInfo_shouldReturnValidMemoryInfo() {
        JmxMonitorService.MemoryInfo info = service.getHeapInfo();

        assertNotNull(info);
        assertTrue(info.getMax() > 0, "Max heap should be greater than 0");
        assertTrue(info.getUsed() >= 0, "Used heap should not be negative");
        assertTrue(info.getCommitted() >= info.getUsed(),
                "Committed memory should be >= used memory");
    }

    @Test
    void getThreadInfo_shouldReturnValidThreadStats() {
        JmxMonitorService.ThreadStatsInfo info = service.getThreadInfo();

        assertNotNull(info);
        assertTrue(info.getThreadCount() > 0, "There should be at least one live thread");
        assertTrue(info.getPeakThreadCount() >= info.getThreadCount(),
                "Peak thread count should be >= current thread count");
    }

    @Test
    void getGcInfo_shouldReturnNonNullList() {
        List<JmxMonitorService.GcInfo> gcInfoList = service.getGcInfo();

        assertNotNull(gcInfoList);
        assertFalse(gcInfoList.isEmpty(), "There should be at least one GC collector reported by the JVM");

        for (JmxMonitorService.GcInfo gc : gcInfoList) {
            assertNotNull(gc.getName());
            assertTrue(gc.getCollectionCount() >= 0);
            assertTrue(gc.getCollectionTime() >= 0);
        }
    }
}