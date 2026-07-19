package com.ay.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import edu.tufts.eaftan.hprofparser.handler.NullRecordHandler;
import edu.tufts.eaftan.hprofparser.parser.datastructures.Constant;
import edu.tufts.eaftan.hprofparser.parser.datastructures.InstanceField;
import edu.tufts.eaftan.hprofparser.parser.datastructures.Static;
import edu.tufts.eaftan.hprofparser.parser.datastructures.Value;

public class HeapAnalysisHandler extends NullRecordHandler {

    private int classCount = 0;
    private int instanceCount = 0;

    private List<Long> classIds = new ArrayList<>();

    private List<Map<String, Object>> classDetails = new ArrayList<>();

    // GC Roots
    private List<Long> gcRoots = new ArrayList<>();

    @Override
    public void classDump(long classObjId,
                          int stackTraceSerialNum,
                          long superClassObjId,
                          long classLoaderObjId,
                          long signersObjId,
                          long protectionDomainObjId,
                          long reserved1,
                          long reserved2,
                          int instanceSize,
                          Constant[] constants,
                          Static[] statics,
                          InstanceField[] instanceFields) {

        classCount++;

        classIds.add(classObjId);

        Map<String, Object> classInfo = new HashMap<>();
        classInfo.put("classId", classObjId);
        classInfo.put("instanceSize", instanceSize);
        classInfo.put("superClassId", superClassObjId);
        classInfo.put("classLoaderId", classLoaderObjId);

        classDetails.add(classInfo);
    }

    @Override
    public void instanceDump(long objId,
                             int stackTraceSerialNum,
                             long classObjId,
                             Value<?>[] instanceFieldValues) {

        instanceCount++;
    }

    // -------------------------
    // GC Root Handling
    // -------------------------

    private void recordRoot(long objId) {
        gcRoots.add(objId);
    }

    @Override
    public void rootUnknown(long objId) {
        recordRoot(objId);
    }

    @Override
    public void rootJNIGlobal(long objId, long JNIGlobalRefId) {
        recordRoot(objId);
    }

    @Override
    public void rootJNILocal(long objId, int threadSerialNum, int frameNum) {
        recordRoot(objId);
    }

    @Override
    public void rootJavaFrame(long objId, int threadSerialNum, int frameNum) {
        recordRoot(objId);
    }

    @Override
    public void rootNativeStack(long objId, int threadSerialNum) {
        recordRoot(objId);
    }

    @Override
    public void rootStickyClass(long objId) {
        recordRoot(objId);
    }

    @Override
    public void rootThreadBlock(long objId, int threadSerialNum) {
        recordRoot(objId);
    }

    @Override
    public void rootMonitorUsed(long objId) {
        recordRoot(objId);
    }

    @Override
    public void rootThreadObj(long objId,
                              int threadSerialNum,
                              int stackTraceSerialNum) {
        recordRoot(objId);
    }

    // -------------------------
    // Getters
    // -------------------------

    public int getClassCount() {
        return classCount;
    }

    public int getInstanceCount() {
        return instanceCount;
    }

    public List<Long> getClassIds() {
        return classIds;
    }

    public List<Map<String, Object>> getClassDetails() {
        return classDetails;
    }

    public List<Long> getGcRoots() {
        return gcRoots;
    }

    public int getGcRootCount() {
        return gcRoots.size();
    }
}