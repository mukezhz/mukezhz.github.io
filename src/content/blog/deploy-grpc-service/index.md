---
title: Deploy gRPC Service in K8s
description: |
  Deploy the gRPC service in kubernetes using Kind: HTTPProxy of contour ingress controller.
date: "Sep 09 2022"
tags:
  - K8s
  - devops
  - gRPC
---

# Contour

<img src="/assets/devops/contour.svg" width="300" height="200"/>

- Contour is an ingress controller which deliver request from domain to respective service.
- It is open source ingress controller alternative to most popular nginx.

### Installation

- [install contour](https://projectcontour.io/getting-started/)
- We have installed contour using yaml method rather than helm

### Reason to use contour

- Contour uses the Envoy proxy as a reverse proxy and load balancer
- [Read the philosophy](https://projectcontour.io/resources/philosophy/)
- [Read the architecture](https://projectcontour.io/docs/v1.22.1/architecture/)
- Since it uses envoy we got direct support of http2 ie gRPC
- **Hierarchical Routing:**: 
  - allows you to define a hierarchical structure of virtual hosts and routes
  - enables you to organize and manage your routing configurations more efficiently, especially in complex environments with multiple services and domains
- **Advanced Traffic Routing:**
  - define sophisticated routing rules based on request headers, paths, methods, and other attributes
  - allows you to direct traffic to different services or backends based on specific criteria, enabling fine-grained control over how requests are handled
- **Request/Response Modification:**
  - allows you to modify both incoming requests and outgoing responses
  - can add, remove, or modify headers, change paths, rewrite URLs, and perform other transformations on the request and response payloads
  - useful for implementing advanced scenarios like URL rewriting, header manipulation, or response augmentation
- **Traffic Splitting:**
  - allows you to distribute traffic between different sets of backends based on defined weights or percentages
  - useful for performing A/B testing, canary deployments, or blue/green deployments

### Deployment of ingress

- For http1 we can use Kind: HttpProxy as well as Kind: Ingress
- For http2 or gRPC we have to use HttpProxy
- [Cotour suggest to use HttpProxy](https://projectcontour.io/docs/v1.22.1/config/fundamentals/)

### Ingress vs HTTPProxy

**Ingress**
- standard API object used to manage ingress traffic into your cluster
- responsible for handling and routing incoming traffic to the appropriate services within the cluster
- uses annotations to define rules for traffic routing, SSL termination, load balancing, and other configuration options
- follows the Ingress specification defined by Kubernetes

### Sample of using contour for Kind: Ingress

```
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ingress-name
  namespace: default
spec:
  rules:
  - host: "subdomain.domain.com"
    http:
      paths:
      - pathType: Prefix
        path: "/"
        backend:
          service:
            name: service-name
            port:
              number: 80
```
**HTTPProxy**
- specific to the Contour Ingress Controller, which is an Ingress controller that runs on top of Envoy proxy.
- uses the HTTPProxy custom resource definition (CRD) instead of the standard Ingress resource
- define more powerful and flexible routing configuration using a hierarchical model
- allows you to create virtual hosts, routes, and includes advanced features like request/response modification, traffic splitting, timeouts, etc
- provides granular control over the traffic routing and allows you to define complex routing rules using its custom syntax

### Sample of using contour for Kind: HttpProxy

**For handling HTTP protocol**

- allows you to define routing configurations for HTTP requests based on various criteria like host, path, headers, etc
- can specify rules to direct incoming HTTP requests to different backend services based on the defined criteria
  - includes routing requests to different services, load balancing, and applying transformations to the request/response headers and payloads
- provides advanced routing capabilities and customization options specifically designed for HTTP traffic, including support for HTTP/2, WebSocket upgrades, and gRPC-specific configurations 

```
apiVersion: projectcontour.io/v1
kind: HTTPProxy
metadata:
  name: httpproxy-name
  namespace: default
spec:
  routes:
    - services:
      - name: grpc-service
        port: 50051
        protocol: h2c/h2
  virtualhost:
    fqdn: subdomain.domain.com
    tls:
      secretName: domain.com
```

**For handling other protocols than HTTP**

- used for handling non-HTTP TCP traffic. It allows you to proxy TCP connections to backend services
- define rules to direct incoming TCP connections to specific backend services based on the configured criteria such as port numbers or SNI (Server Name Indication)
- useful for exposing non-HTTP protocols such as MySQL, PostgreSQL, or other TCP-based services
- enables Contour to proxy the TCP traffic to the appropriate backend service without parsing or manipulating the traffic as HTTP

```
---
apiVersion: projectcontour.io/v1
kind: HTTPProxy
metadata:
  name: http-proxy-name
  namespace: default
spec:
  tcpproxy:
    services:
      - name: service-name
        port: 80
        protocol: h2c/h2
  virtualhost:
    fqdn: subdomain.domain.com
    tls:
      secretName: domain.com
```

##### H2 vs H2C
**HTTP/2 (h2)**
- used over a secure connection, typically encrypted using Transport Layer Security (TLS) with HTTPS
- major revision of the HTTP protocol that provides enhanced performance and efficiency compared to its predecessor, HTTP/1
- introduces features such as multiplexing, server push, request/response headers compression, and binary framing
- can sometimes cause compatibility issues with certain firewalls, proxies, or older clients that do not support HTTP/2 or TLS

**HTTP/2 Cleartext (h2c):**
- operates over a cleartext (unencrypted) connection, which means the data is transmitted without encryption
- does not provide any encryption, which means the data is transmitted in plain text, making it vulnerable to interception and modification by attackers
- using HTTP/2 without encryption (h2c) is not recommended for production deployments due to security concerns
- does not have this additional TLS overhead, making it potentially easier to work with in certain network environments




**Note**: Please install/update contour to the compatible version with kubernetes. Once we were using incompatible version of contour it was causing issue of not serving newly domain.