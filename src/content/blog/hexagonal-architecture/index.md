---
title: Hexagonal Architecture | Ports and Adapters Architecture
description: |
  Hexagonal Architecture/Ports and Adapters Architecture is a software design pattern that emphasizes the separation of core business logic from external dependencies. It uses ports and adapters to define clear boundaries, allowing the application to be flexible, testable, and maintainable.
date: "May 19 2023"
tags:
  - Architecture
  - CleanCode
  - TDD
---
<img src="/assets/clean_code/hexagonal_architecture.jpg" width="600" height="300">

**LTDR;**

**Hexagonal Architecture** helps in **structuring** a software application by **providing clear and well-defined boundaries** between **different layers and components**. It promotes a **modular and decoupled design**, where the **core business logic is isolated from external dependencies**.

By using ports and adapters, Hexagonal Architecture enables the application to interact with external systems through standardized interfaces, making it easier to replace or modify adapters without impacting the core functionality. This modular structure improves maintainability, testability, and flexibility, allowing for easier development and evolution of the application over time.

---

I always used to think how big project are managed. On researching on it, I found that they used to follow clean code architecture. Clean code architecture help us to structure our project. Among many clean code architecture hexagonal architecture is one of them. I got a chance to start a project from scratch and I thought applying clean architecture on it. One of the engineering manager suggest me to do the project on hexagonal architecture. So, I researched about it and got the gist of it which I am going to share here. By the way I used micronaut (java's framework) for project.

**Start is pain but we love the journey** 😁😁😁

---

**Clean Architecture** is NOT just a folder structure.
It's the idea of seperating the application into layers and conforming the Dependency Rules to create a system that is:

- Independent of Framewors
- Testable
- Independent of UI
- Independent of Database
- Independent of any external agency

---

**Hexagonal Architecture**, also known as **Ports and Adapters Architecture**, is a software design pattern that promotes a clear separation of concerns and dependencies within an application. It main goal to isolate the **core business logic** or **domain** from **external dependencies** such as **frameworks, databases, or user interfaces**.

In this architectural pattern, the **core business logic** is at the center, surrounded by multiple layers or **"ports"** that define interfaces representing the application's capabilities. These ports act as contracts or boundaries through which the application interacts with the outside world.

The adapters, which **reside outside the core**, implement these interfaces(ports) and provide the necessary translations and interactions with external systems or frameworks. Adapters enable the application to communicate with the infrastructure components, such as databases, APIs, or user interfaces.

This separation of concerns allows the core business logic to be agnostic of the external details and simplifies testing, modifiability, and maintainability. It promotes flexibility and enables the application to evolve independently by easily swapping or modifying adapters while keeping the core intact.

### Key Concepts

#### Domain Layer

- responsible for business logic of application
- most stable layer (heart of architecture)
- we can apply Domain Driven Design Tactics(DDD) such as:
  - aggregates
  - value objects
  - entities
  - domain services
- this layer doesn't have any access to other layer
- isolated from infrastructure details and focuses solely on expressing the concepts, behaviours and ruls specific to the problem domain
- contains:
  - domain models,
  - business logic,
  - ports,
  - domain servies
  - domain exceptions

#### Application Layer

- contains application specific business rules
- this layer directly manipulates the domain
- implements all the use cases of the application
- uses domain layer
- isolated from the details and implementation of outer layers, such as databases, adapters, etc.
- layer responsible for implementing the application specific business logic and orchestrating the interactions between domaina and infrastructure layer
- contains:
  - use cases
  - interactors
  - application services
  - workflow

#### Infrastructure

- this layer implements the domain repository with concrete backends such as a database, files, in-memory and more.
- contains all the concrete implementations of application like repository, adapters, database connection, etc.
- layer responsible for interacting with external systems, framework, libraries or any technology specific implementation.
- contains:
  - data storage
  - external services
  - communication protocol
  - adapters
  - configurations

#### Presentation

- this layer handles how the rest of the world interacts with the application
- contains:
- web service (controller),
- html presentator or renderer

**Note:**

0. you don't need to place files in exactly that particular directory since hexagonal architecture didn't tell about folder stucture
1. **port**:- infrastructure & **adapter**:- implementation of port in most cases
2. Service/UseCase uses port for implementing business logic
3. Business Logic shouldn't depends on:

- weather we expose a REST API, GraphQL API, gRPC ... any other API
- where we get data from

This architecture allows us to isolate the core logic of our application from outside concerns. Having our core logic isolated means we can easily change data source details without a significant impact or major code rewrites the codebase.

One way to create those PORTS and ADAPTERS is by using "Dependency Inversion Principle".

**Dependency Inversion Principle:**

- "High level modules should not import anything from low level modules. Both should depend on abstractions."
- "Abstraction shouldn't depends on details. Details should depend on abstractions."

### Port

- communication interface that allows components or systems to interact with each other
- defines a contract or set of operations that can be invoked by other components
- provide an abstraction for communication and decouple the components involved
- serves as contracts or abstractions that define the expected behavior
- represents an interface that defines the operations or behaviors required by application core(domain) to interact with external system or framework

### Adapter

- design pattern that allows object with incompatible interfaces to work together
- acts as bridge between 2 interfaces [converting the interface of one object into the interface expected by the other object]
- achieve interoperability between different components or systems

### Service

- represents the underlying functionality or business logic that adapter needs to leverage or adapt to
- this came is from DDD

---

**Resources**:

1. [Hexagonal Architecture by Alistair Cockburn](https://alistair.cockburn.us/hexagonal-architecture/)
2. [Hexagonal Architecture: What You Need To Know - Simple Explanation](https://youtu.be/bDWApqAUjEI)
3. [More Testable Code with the Hexagonal Architecture](https://youtu.be/ujb_O6myknY)
4. [Ready for changes with Hexagonal Architecture](https://netflixtechblog.com/ready-for-changes-with-hexagonal-architecture-b315ec967749)
5. [Understanding Hexagonal Architecture With a Spring Boot Implementation](https://betterprogramming.pub/hexagonal-architecture-with-spring-boot-74e93030eba3)
6. [Hexagonal architecture with Domain, Presenter & Entity segregation on Spring WebFlux](https://medium.com/javarevisited/hexagonal-architecture-with-domain-presenter-entity-segregation-on-spring-webflux-ef053a495bdc)
7. [Hexagonal Architecture in Java](https://medium.com/javarevisited/hexagonal-architecture-in-java-9031d3570d15)
8. [Hexagonal Architecture, there are always two sides to every story](https://medium.com/ssense-tech/hexagonal-architecture-there-are-always-two-sides-to-every-story-bc0780ed7d9c)
9. [Ports & Adapters architecture on example](https://wkrzywiec.medium.com/ports-adapters-architecture-on-example-19cab9e93be7)

I found [Ports & Adapters architecture on example](https://wkrzywiec.medium.com/ports-adapters-architecture-on-example-19cab9e93be7) this blog very interesting.

Thank you for reading!!!