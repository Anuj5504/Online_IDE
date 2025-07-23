# Dockerfile

FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
  build-essential \
  g++ \
  python3 python3-pip \
  openjdk-17-jdk \
  curl \
  nano \
  git \
  bash \
  && apt-get clean

# Set default shell
SHELL ["/bin/bash", "-c"]

# Java environment
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

WORKDIR /workspace

CMD ["bash"]
