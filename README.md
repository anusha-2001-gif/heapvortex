# HeapVortex – 3D JVM Memory Leak Profiler

## Overview

HeapVortex is an advanced full-stack Java application that provides real-time visualization of Java Virtual Machine (JVM) memory usage. It helps developers and DevOps engineers identify memory leaks quickly by transforming complex heap data into an interactive 3D object graph.

Unlike traditional memory analysis tools that generate static reports, HeapVortex streams live JVM memory telemetry and displays object relationships in a dynamic WebGL-based interface, enabling faster debugging and collaborative analysis.

---


## Features

* Live JVM monitoring using JMX
* Real-time memory telemetry
* Heap dump parsing (.hprof)
* GC Root detection
* Object reference graph analysis
* WebSocket-based live data streaming
* Interactive 3D visualization using Three.js
* Object inspection with memory footprint details
* Dashboard displaying CPU and Heap usage
* Secure JMX communication using SSL/TLS
* Docker container support

---

## Tech Stack

### Backend

* Java 21
* Spring Boot
* Spring WebSocket
* Java Management Extensions (JMX)
* Eclipse Memory Analyzer (MAT) APIs
* Maven

### Frontend

* React
* Three.js
* WebGL
* HTML5
* CSS3
* JavaScript

### DevOps

* Docker
* Git
* GitHub

---

