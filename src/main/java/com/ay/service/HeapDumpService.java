package com.ay.service;

import com.sun.management.HotSpotDiagnosticMXBean;
import org.springframework.stereotype.Service;

import java.io.File;
import java.lang.management.ManagementFactory;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class HeapDumpService {

    
    private static final String DUMP_DIR = "heapdumps";

    
    public String generateHeapDump() throws Exception {

        
        File dir = new File(DUMP_DIR);
        if (!dir.exists()) {
            dir.mkdirs();
        }

        
        String timestamp = LocalDateTime.now()
                .format(DateTimeFormatter.ofPattern("yyyyMMdd_HHmmss"));
        String fileName = "heapdump_" + timestamp + ".hprof";
        String filePath = DUMP_DIR + File.separator + fileName;

       
        HotSpotDiagnosticMXBean mxBean = ManagementFactory.getPlatformMXBean(
                HotSpotDiagnosticMXBean.class
        );

        
        mxBean.dumpHeap(filePath, true);

        return filePath;
    }

    
    public File[] listHeapDumps() {
        File dir = new File(DUMP_DIR);
        if (!dir.exists()) {
            return new File[0];
        }
        return dir.listFiles((d, name) -> name.endsWith(".hprof"));
    }

    
    public File getHeapDumpFile(String fileName) {
        return new File(DUMP_DIR + File.separator + fileName);
    }
}