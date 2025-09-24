# Cloud IDE Runner Docker Setup

This guide explains how to build and run the Docker container for the backend of the Cloud IDE project.

## Prerequisites

- [Docker](https://www.docker.com/get-started) installed on your system.
- Access to the project source code.

## Steps

### 1. Navigate to the backend source folder

```bash
cd backend/src
```
```bash
docker build -t cloud-ide-runner .
```
```bash
docker run cloud-ide-runner
```

