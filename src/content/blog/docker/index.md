---
title: Docker
description: |
  Docker packages an application and its dependencies in a virtual container that can run on any OS or computer. This enables the application to run in a variety of locations, such as on-premises, in public (see decentralized computing, distributed computing, and cloud computing) or private cloud.
date: "May 20 2023"
tags:
  - docker
  - container
  - devops
---

**Wiki**: Docker is a set of platform as a service (PaaS) products that use OS-level virtualization to deliver software in packages called [containers](/blog/container). The service has both free and premium tiers. The software that hosts the containers is called Docker Engine. It was first started in 2013 and is developed by Docker, Inc.

**I have already written the blog on [container](/blog/container).** Today this is all about "Docker" which really popularize or revolutionized the container technology.

**In short,** Docker is an open-source platform that enables developers to automate the deployment, scaling, and management of applications using containerization.

- It allows you to package an application and its dependencies into a standardized unit called a container.
- Containers are lightweight and isolated environments that can run on any operating system, providing consistent behavior regardless of the underlying infrastructure.

**What docker popularized the Docker?? So, container exists before Docker??**
Ans: Yes. Containerization existed in various forms, but it was complex and lacked standardization. Some examples of how containerization was used before Docker.

- **Operating System-Level Virtualization:**
  - Technologies like Linux Containers (LXC) and Solaris Containers (Zone) provided operating system-level virtualization.
  - They allowed for the creation of lightweight and isolated environments known as containers, which could run multiple applications or services on a single host.
  - These containers shared the host operating system kernel while maintaining separate user spaces.
- **Virtual Machines:**
  - Virtualization technologies like VMware, VirtualBox, and Xen allowed the creation of virtual machines (VMs) that could run multiple operating systems and applications on a single physical host.
  - Each VM had its own complete operating system instance, including the kernel, and provided isolation from other VMs.
  - While VMs offered strong isolation, they were relatively heavyweight due to the need for separate operating system instances.
- **Application Sandboxing:**
  - Some platforms provided sandboxing capabilities to isolate applications. For example, **Java's Java Runtime Environment (JRE)** enabled the deployment of Java applications in a sandboxed environment, ensuring application-level isolation and portability across different operating systems.
  - Sandboxes were limited to specific programming languages or frameworks.
- **Configuration Management:**
  - System administrators often used configuration management tools like Puppet, Chef, or Ansible to manage application dependencies and configurations across different servers.
  - While not true containerization, these tools aimed to provide consistency and reproducibility by automating the setup and deployment of applications.

These containerization approaches had limitations. They often required deep knowledge of the underlying technologies, were complex to set up and manage, lacked standardization, and suffered from compatibility issues across different environments.

**And here comes the Docker,** who addressed many of these challenges by introducing a simplified, standardized, and portable containerization solution that leveraged container images and a layered file system, leading to its widespread adoption and the transformation of the containerization landscape.

### History Time

- Docker was initially released as an open-source project in March 2013 by Solomon Hykes and his team at **dotCloud**.
- It quickly gained popularity due to its simplicity and the benefits it brought to the containerization landscape.
- In 2015, Docker, Inc. was founded to provide commercial support and develop enterprise-focused products around Docker.
- Since then, Docker has become the de facto standard for containerization, powering millions of applications and forming the foundation for container-driven development and deployment practices.

**But what does the Docker uses under the hood?**
Docker utilizes several underlying technologies to enable containerization, including **namespaces**, **control groups (cgroups)**, and a **Union File System**. These components work together to provide isolation, resource management, and efficient storage for Docker containers.

##### Namespaces

    - Docker leverages Linux namespaces to provide process-level isolation within containers.
    - Namespaces separate various aspects of a container, such as the process tree, network interfaces, mount points, and user IDs, from the host and other containers.
    - This isolation ensures that processes running inside a container are confined and cannot interfere with processes outside the container.

##### Control Groups (cgroups)

    - Docker utilizes cgroups to manage and limit the resources allocated to containers.
    - With cgroups, Docker can allocate and control resources such as CPU, memory, disk I/O, and network bandwidth for each container.
    - This ensures fair resource sharing and prevents a single container from monopolizing resources and affecting the performance of other containers or the host system.

##### Union File System

    - Docker employs a Union File System (typically OverlayFS or aufs) to provide a layered approach to file system management.
    - This allows for the efficient creation and distribution of container images.
    - A Union File System uses multiple layers of file systems to create a unified view, where each layer contains the changes or additions compared to the layers below it.
    - This layering mechanism makes Docker images lightweight, as only the differences between layers need to be stored.

Docker also utilizes other technologies such as the **container runtime (typically containerd or runc)** for managing container execution, **networking components** to enable container networking, and **image registries** (like Docker Hub or private registries) for storing and distributing container images.

**How does the docker revolutionized the containerization landscape?**  
Docker revolutionized the containerization landscape by introducing several key advancements:

- **Image-based approach:**
  - Docker introduced a new way of working with containers by using container images.
  - Docker images are version-controlled, easily reproducible, and can be shared across different environments.
- **Layered file system:**
  - Docker introduced a layered file system, which allows for efficient storage and sharing of container images.
  - Each layer represents a change or modification to the base image, and these layers can be cached and reused across different images.
  - This approach significantly reduces image size and accelerates image building and distribution.
- **Container orchestration:**
  - Docker provided tools and frameworks for managing containerized applications at scale.
  - Docker's native orchestration tool, Docker Swarm, simplifies the deployment and scaling of containers across multiple hosts.
  - Docker later introduced Kubernetes integration, enabling seamless integration with the popular container orchestration platform.

**Notes:**

- **Image:** An image is a lightweight, standalone, and executable software package that includes everything needed to run an application, including the code, runtime, libraries, and dependencies.

**While Docker is widely popular, it's not the only tool for containerization. Other containerization platforms and tools have emerged, such as:**

1. **LXC/LXD: LXC (Linux Containers) and LXD (Linux Container Daemon)** are Linux-based containerization technologies that predate Docker. They provide lightweight operating system-level virtualization, similar to Docker containers. However, they have a different focus and a slightly different set of features.
2. **Kubernetes:** Kubernetes is a container orchestration platform that can work with Docker and other container runtimes. It provides advanced scheduling, scaling, and management capabilities for containerized applications in a clustered environment.
3. **rkt: rkt (pronounced "rocket")** is an alternative container runtime developed by CoreOS. It aims to provide a secure, composable, and flexible container execution environment. Although it gained some traction, Docker remains the dominant player in the containerization ecosystem.
4. **Podman:** is an alternative container runtime and command-line tool that aims to provide a more lightweight and secure approach to container management.

That's it for today. [Also check how docker works...](/blog/how-docker-works)

---

Thank you for reading!!!