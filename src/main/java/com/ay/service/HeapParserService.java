package com.ay.service;

import edu.tufts.eaftan.hprofparser.parser.HprofParser;
import org.springframework.stereotype.Service;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Service
public class HeapParserService {

    public Map<String, Object> parseHeapDump(File heapDumpFile) {

        Map<String, Object> result = new HashMap<>();

        if (!heapDumpFile.exists()) {
            result.put("status", "error");
            result.put("message", "Heap dump file not found!");
            return result;
        }

        HeapAnalysisHandler handler = new HeapAnalysisHandler();
        HprofParser parser = new HprofParser(handler);

        try {

            parser.parse(heapDumpFile);

            result.put("status", "success");
            result.put("classes", handler.getClassCount());
            result.put("instances", handler.getInstanceCount());

            result.put(
                    "classIds",
                    handler.getClassIds().subList(
                            0,
                            Math.min(10, handler.getClassIds().size())
                    )
            );

            result.put(
                    "classDetails",
                    handler.getClassDetails().subList(
                            0,
                            Math.min(10, handler.getClassDetails().size())
                    )
            );

            // GC Root Information
            result.put("gcRoots", handler.getGcRootCount());

            result.put(
                    "rootObjects",
                    handler.getGcRoots().subList(
                            0,
                            Math.min(10, handler.getGcRoots().size())
                    )
            );

        } catch (IOException e) {

            result.put("status", "error");
            result.put("message", e.getMessage());

        }

        return result;
    }
}