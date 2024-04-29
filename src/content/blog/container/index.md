---
title: Containerization
description: |
  A lightweight and isolated executable unit that packages an application along with all its dependencies, including libraries, frameworks, and system tools.
date: "May 21 2023"
img_alt: Container Image
tags:
  - container
  - devops
  - docker
---

### Containerization

<img src="/assets/devops/container.svg" width="300" height="200">

**Containerization refers to the process of creating and running containers.** Containers???

**TLDR;**
Container are isolated and self-contained units that encapsulate an application and its dependencies. It involves packaging the necessary software components, libraries, and configurations required for an application to run into a single, portable unit.

---

**Note:**: please read [how appliction execute](./how-application-execute) to understand container properly.

### Container

- a lightweight and isolated executable unit that packages an application along with all its dependencies, including libraries, frameworks, and system tools
- provides a consistent and reproducible environment for running software across different systems, regardless of the underlying infrastructure.
- think container as a self-contained environment which includes everything needed to run an application, similar to a virtual machine (VM) but they don't require a separate operating system for each instance
- they share the host system's kernel and other resources, making them faster to start, use less disk space, and require fewer resources than traditional VMs

#### Containers provide several key benefits:

- **Portability**
  - can be deployed on any system that supports containerization, regardless of the underlying operating system or infrastructure
  - makes it easier to move applications across development, testing, and production environments without worrying about compatibility issues
- **Isolation**
  - provide isolation at the operating system level, ensuring that the processes running inside a container are isolated from other containers and the host system
  - isolation prevents conflicts between applications and helps improve security
- **Scalability**
  - designed to be easily replicated and scaled horizontally
  - can run multiple instances of the same container, distributing the workload across multiple machines or nodes
  - allows applications to handle increased traffic and scale seamlessly as demand fluctuates
- **Efficiency**
  - have minimal overhead because they share the host system's kernel and resources
  - start quickly and use fewer system resources compared to traditional virtualization approaches, resulting in better resource utilization and improved overall system performance
- **Versioning and Reproducibility**
  - built from Docker images or any other platform , which are versioned and can be shared and reproduced across different environments
  - ensures consistent behavior and eliminates the "it works on my machine" problem, making it easier to collaborate and deploy applications reliably

Containers are managed using containerization platforms like Docker, Buildah & Podman, ...These platforms provide tools and APIs to build, run, and manage containers effectively. By leveraging containers, developers can create portable and efficient application deployments that can run consistently across various systems and environments.

### In short:

Containerization refers to the process of creating and running containers, which are isolated and self-contained units that encapsulate an application and its dependencies. It involves packaging the necessary software components, libraries, and configurations required for an application to run into a single, portable unit.

Containerization technology provides the infrastructure and tools to create, deploy, and manage containers. Docker is one of the most popular containerization technologies and has played a significant role in popularizing containerization.

---

Thank you for reading!!!
