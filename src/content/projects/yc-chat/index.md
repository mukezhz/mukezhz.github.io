---
title: "Hamro Chat"
description: "Chat with your friends, family and colleagues."
date: "Sep 06 2022"
demoURL: "https://chat.hamropatro.com"
repoURL: ""
tags:
  - meet
  - chat
  - hamropatro
---

<img src="/assets/hamropatro/hamropatro.svg" alt="hamro chat" width="200" height="200">

[Hamro Chat](https://chat.hamropatro.com) is like Facebook Messenger(which is private chat in Hamro Chat) and Facebook page's chat(which is app's chat) where the admin/moderator's of a page can respond to ther user message.
It is developed using Micronaut's Grpc(Java Framework), Svelte(Javascript Library), Redis, ScyllaDB (Database), Elasticsearch, Kafka.

We have used micronaut because all the other product at Hamropatro uses Micronaut. Yes most of the product at Hamropatro is in Java language.
If you have read my [about](/about) you will know that I had learned the Java before joining the college. But after doing python 2nd sem I stopped doing Java because of python is coolest language. But I have to do the project here in Java which I found boring at first. I also get motivation from the CEO that Java is also cool give it a try. So I tried the backend in Java (senor helped me a lot here). When I got familiar with Micronaut Dependency Injection, I immediately felt in love with Java. I was like how can it be so awesome. So I started searching about architecture of project. I wanted to make project structure in such a way that later it can be changed to microservices. On searching and asking with Engineering Manager I got to know about [hexagonal architecture](/blog/hexagonal-architecture).

I haven't heard about hexagonal architecture before this project. I was learning hexagonal architecture and micronaut and developing the project at the same time which was hectic but I think I learn many things at that time.
Oh I forgot, I hadn't done the gRPC and multi-module before, I was also learning about gRPC, gradle multi-module.

I used to tell my friend about those tools whether they are interested on listening or not haha.

At first, the code was disaster multi-level interfaces which was doing the exactly same things. I asked many question to one of the Engineering Manager of Hamropatro. He explained me about hexagonal architecture, he also reviewed my code and gave suggestion.

I refactored the code and made the code proper using hexagonal architecture.
We developed the POC of hamro chat which has authentication, one to one private chat without using actual db(was using ArrayList). Later added group chat and demo worked.
Now it has scyllaDB as database and elasticsearch for message and inbox.

Basic Architecture of Hamro Chat is:

```
(subscribed to SSE service)              (listens redis pubSub and send the message on particular topic)
            👆                                                     👆
        +--------+               +-------------+              +-----------+
        + client + ----------->  + SSE service + -----------> + Micronaut +
        +--------+               +-------------+              +---------- +
                                       👇
                    (subscribe to micronaut using pubSub of Redis)
```

As you can see we haven't used the webRTC or gRPC bidirection streaming. Instead we used Server Side Event. So, the streaming is unidirectional.

Hamro Chat is being used at:

- For Personal Chat
- Hamro Pay support chat section
- Hamro Health support chat section

Thank you !!!