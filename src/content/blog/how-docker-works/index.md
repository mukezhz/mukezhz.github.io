---
title: How Docker Works
description: |
  Docker makes use of a client-server architecture. The Docker client talks with the docker daemon which helps in building, running, and distributing the docker containers. Client runs with the daemon on the same system or we can connect the Docker client with the Docker daemon remotely.
date: "May 24 2023"
tags:
  - docker
  - container
  - devops
---
<img src="/assets/devops/docker-architecture.png" width="300" height="200"/>

## Docker Components

Docker works by utilizing a client-server architecture and a set of tools and components that enable containerization, image management, and container deployment.

1. **Docker Client**
   - The Docker client is a command-line interface (CLI) tool that allows users to interact with Docker.
   - It provides a user-friendly interface for issuing commands and managing Docker resources.
   - The Docker client can be installed on a local machine or a remote system, and it communicates with the Docker daemon (server) to perform various operations.
   - The client accepts commands from the user, sends them to the Docker daemon, and receives the responses or results.
   - The Docker client provides a set of commands that enable users to **build, run, manage, and monitor** Docker **containers, images, networks, volumes, and other Docker resources**.
2. **Docker Host:**

   - The Docker host refers to the machine or system on which the Docker daemon (server) is running.
   - The Docker host can be a physical or virtual machine running a supported operating system, typically Linux, though Docker also has support for running on Windows and macOS.
   - The Docker daemon interacts directly with the host operating system and leverages various Linux kernel features, such as namespaces and control groups, to provide containerization and isolation.
   - The Docker host is responsible for executing and managing containers based on the commands and instructions received from the Docker client.

     - **Docker Daemon:**

       - The Docker daemon is responsible for managing Docker objects, such as containers, images, networks, and volumes.
       - It runs as a background process on the host and listens for commands from the Docker client.
       - The Docker daemon, called dockerd, runs on the host machine and listens for requests from the Docker client.
       - The Docker daemon handles the container lifecycle, resource management, and coordination with underlying components.

     - **Docker Image:**

       - A Docker image is a **read-only template that contains the instructions for creating a Docker container**.
       - It includes the application code, runtime, libraries, and dependencies required to run the application.
       - Docker images are built from a set of instructions defined in a Dockerfile, which specifies the steps to build the image layer by layer.
       - Images are stored in a registry, such as Docker Hub, and can be pulled from the registry to create containers.
       - Docker images are immutable, meaning they cannot be modified once created.
       - ie. when changes are made to an application, a new image is built with the updated code or configuration.

     - **Docker Container:**
       - A Docker container is a runnable instance of a Docker image.
       - It is an isolated runtime environment that encapsulates an application along with its dependencies.
       - Containers are lightweight, portable, and provide process-level isolation.
       - Each container runs as a separate process on the host system and has its **own isolated filesystem, network interfaces, process tree, and user IDs**.
       - Containers can be created, started, stopped, restarted, and deleted using Docker commands.

3. **Docker Registry:**

   - A Docker registry is a central repository for storing and distributing Docker images.
   - It serves as a registry or library where Docker users can publish, share, and discover container images.
   - The Docker registry is a crucial component in the Docker ecosystem, enabling users to access and download images required for running containers.

**If you have read operating system you might be familiar with this**:

```
Program in execution is Process

Similarly analogy for container,

Program -> Image
Process -> Container

ie. if we run the Image -> Container is obtained.
```

#### Now let's see how we start the docker container.

Think Docker as a minimal OS/Application which has minimal dependency to execute a program. For example:  
Let's think it as simple OS where nothing is installed. And your task is to install Firefox  
**Note:** OS having all the dependencies to run the Firefox.

What will you to install Firefox on that OS?  
**Ans:**

- Obviously you will download the Firefox program from the internet ie. Pull the Firefox from the internet or repository.
- Then you will install the Firefox ie. configure the program.
- Then run/start the Firefox.

We will do the same in case of docker to run..  
**Ans:**

- Pull the image from the repo.

  ```bash
  $ docker pull <image:tag>
  ```

- Start or Run the image.

  ```bash
  $ docker run -it --name <container> ... <image:tag>
  ```

Docker container is simpler than installing the program and running it.

#### Now what if you want to modify the Docker Image?

**Ans:**  
For normal application:

- Clone or fetch the project
- Modify the source code
- Build the project
- Publish the project to artifact or reposioty

For Docker:

- Pull the image
- Write the dockerfile using th Base Image
- Build the image which suit your need
- Push the image to the repository

#### Now lets see how docker works?

1. **Image Check:**

   - Docker first checks if the specified Docker image is available locally.
   - If the image is not present on your system, Docker automatically downloads it from a registry (such as Docker Hub) unless you have specified a different registry.

2. **Container Creation:**

   - Docker creates a new container based on the specified image.
   - The container is an instance of the image, representing a runnable environment with its own isolated filesystem, networking, and process space.

3. **Namespace Isolation:**

   - Docker uses Linux namespaces to provide process -level isolation for the container.
   - Namespaces create separate instances of various system resources, such as process ID (PID) namespace, network namespace, and mount namespace.
   - This isolation ensures that processes running inside the container are isolated from the host system and other containers.

4. **Control Group Allocation:**

   - Docker leverages Linux control groups (cgroups) to allocate and manage system resources for the container.
   - Control groups allow Docker to limit and allocate CPU usage, memory, disk I/O, and other resources for the container, ensuring fair sharing and preventing resource conflicts.

5. **Writable Container Layer:**

   - Docker adds a writable layer on top of the image, known as the container layer or container filesystem.
   - This layer allows the container to make changes and store data during its execution.
   - Any modifications made to the container, such as creating or modifying files, are stored in this layer while leaving the underlying image intact.

6. **Container Startup:**

   - Docker starts the container and executes the command specified in the docker run command or the default command defined in the Docker image.
   - The application or process inside the container begins running in its isolated environment.

7. **Output and Interaction:**

   - The output of the containerized application is redirected to the Docker client, allowing you to see the logs, progress, or any output generated by the application.
   - You can also interact with the running container, such as sending signals, attaching to its console, or executing commands inside the container using the docker exec command.

That's it for today. [Also check how to build docker image...](/blog/build-docker-image)

---

Thank you for reading!!!