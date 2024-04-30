---
title: "Chat System for Customer Support"
description: "Chat application for CSR."
date: "Sep 03 2024"
demoURL: ""
repoURL: ""
tags:
  - "CS chat"
  - chat
  - wesionaryTEAM
---

<img src="/assets/wesionaryTEAM/csr.png" alt="csr chat system" width="200" height="200">

[Chat System for CSR](https://chat.yc-otodoke.com) is chat application for the customer support.
It is developed using Golang, ReactJS, Flutter, Appsync and Serverless [Lambda-NodeJS]. In database we have used dynamoDB and Opensearch.

**Note:** website won't work you need to have certificate ie. private key in your system to access the website.

There was a requirement to fetch the unread count and read all the chat message at once. This was a challenging problem since we need to do a complex query in opensearch to fetch the unread count. Because of our nested data structure in Opensearch it was taking longer time than we have expected. So we change the data structure and make it less nested which took less time than before. Still it was not meeting our criteria while doing performance test. Infact Opensearch was being shut down due to heavy load. 

**Note:** we have used the AWS managed opensearch which should auto scale, but it was not being scaled automatically. 

So we spin up two ec2 instance and setup opensearch and connected two opensearch with each other and change the read queue size from 1000(default read queue size of opensearch) to 5000. On doing so opensearch was able to handle the load although it was taking few more time than before. It was great achievement for us.

Finding from this project:
- if you need to handle huge amount of load and your server is your bottle neck. Just use the queue which have high throughput. Because handling request with few second of delay is way than server not responding.
- Don't use too much nested structure. Since we were using appsync which uses graphql it was very easy to play around with nested data structure in reality nested structure just slow your performance if you need response in realtime.
- if you are doing query in Opensearch if you need exact match in string please use `.keyword` else it would send inconsistent result. Example: it was matching the following uuid
  - 066250ac-0174-4ef1-`b8d4`-c1a95dcb9be9
  - d539dc77-a9be-4b3d-`b8d4`-4c2dcda090db
- you can use logs.FilterPattern to fetch the error from cloudwatch.
- dynamodb does scale well but opensearch will be bottle neck because you can't modify read queue size if you use the AWS managed service.
- invest your time in research for the tech stack.

Thank you !!!