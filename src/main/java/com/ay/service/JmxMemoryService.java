package com.ay.service;

import java.lang.management.ManagementFactory;
import java.lang.management.MemoryMXBean;
import java.lang.management.MemoryPoolMXBean;
import java.lang.management.MemoryUsage;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

@Service
public class JmxMemoryService {

    public Map<String, Object> getMemoryInfo() {

        Map<String, Object> result = new HashMap<>();

        MemoryMXBean memoryBean = ManagementFactory.getMemoryMXBean();

        MemoryUsage heap = memoryBean.getHeapMemoryUsage();
        MemoryUsage nonHeap = memoryBean.getNonHeapMemoryUsage();

        result.put("heapUsed", heap.getUsed());
        result.put("heapCommitted", heap.getCommitted());
        result.put("heapMax", heap.getMax());

        result.put("nonHeapUsed", nonHeap.getUsed());
        result.put("nonHeapCommitted", nonHeap.getCommitted());

        List<MemoryPoolMXBean> pools = ManagementFactory.getMemoryPoolMXBeans();

        Map<String, Object> memoryPools = new HashMap<>();

        for (MemoryPoolMXBean pool : pools) {

            MemoryUsage usage = pool.getUsage();

            if (usage != null) {

                Map<String, Object> info = new HashMap<>();

                info.put("used", usage.getUsed());
                info.put("committed", usage.getCommitted());
                info.put("max", usage.getMax());

                memoryPools.put(pool.getName(), info);
            }
        }

        result.put("memoryPools", memoryPools);

        return result;
    }
}