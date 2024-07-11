---
title: "Integrating gRPC with REST for Enhanced Web Development  Part II"
description: "Integrating gRPC with REST for Enhanced Web Development  Part II"
date: "Jun 5, 2024"
tags:
  - Medium
  - rest-api
  - web-development
  - golang
  - grpc-gateway
  - grpc
link: "https://articles.wesionary.team/integrating-grpc-with-rest-for-enhanced-web-development-part-ii-81f68241ed6c?source=rss-9b846a86b10c------2"
image: "https://cdn-images-1.medium.com/max/1024/0*MSjRww4i0mJ-1Tyr"
---
Mapping REST’s header to gRPC’s metadata

![maping REST’s header to gRPC’s metadata](https://cdn-images-1.medium.com/max/1024/0*MSjRww4i0mJ-1Tyr)

map rest header to grpc metadata

This article continues from the previous [one](https://articles.wesionary.team/integrating-grpc-with-rest-for-enhanced-web-development-18a66fcebd9d). If you haven’t read it yet, I highly recommend doing so before proceeding with this one. In the previous article, we explored communication between a REST API and gRPC.

Now, we will learn how to pass headers from the REST API to gRPC’s metadata. HTTP headers are a critical entity on the web, allowing us to send additional information such as authorization tokens or custom client details. Headers can also convey cache behavior, content types, redirection information, and much more.

### Let’s begin

As we have already communicated between REST and gRPC. The flow was:

* The gRPC server must be up and running, having already implemented the service specified in the proto file
* When a REST request is received by the REST server, it delegates the request to the gRPC server using an HTTP mux.

The conversion between json body and protobuf is being handled by gRPC-gateway package. gRPC-gateway need http mux for the communication between REST and gRPC.

### Map REST’s header to gRPC’s metadata

Similarly in order to pass the REST’s header to gRPC’s metadata we just need a way to marshal header to gRPC metadata.

For this we can use the mux option **runtime.WithIncomingHeaderMatcher(HeaderMatcher)**
[https://medium.com/media/0d27f9fcb1774bb7a568cb6f4613c22b/href](https://medium.com/media/0d27f9fcb1774bb7a568cb6f4613c22b/href)
#### Code explanation:

* runtime.NewServeMux : initializes a new ServeMux instance from the grpc-gateway/runtime package (ServeMux is responsible for routing incoming HTTP requests to appropriate gRPC handlers)
* runtime.WithMarshalerOption : is used to specify a custom marshaler for a given content type
* "application/json+pretty" : is the content type for which this marshaler is being defined \[indicates that the responses should be formatted as pretty-printed JSON\]
* &runtime.JSONPb{} : creates a new instance of runtime.JSONPb, which is a JSON marshaler that uses the protojson package to handle the conversion between Go structures and JSON
* MarshalOptions : specifies the options for marshaling (converting) Go structures into JSON
* Indent: " " : specifies that the JSON output should be indented with two spaces, making it more human-readable
* Multiline: true : indicates that the JSON should be formatted in multiple lines \[this option is typically implied by the presence of Indent\]
* UnmarshalOptions : specifies the options for unmarshaling (converting) JSON into Go structures
* DiscardUnknown: true : indicates that unknown fields in the JSON input should be ignored rather than causing an error
* runtime.WithIncomingHeaderMatcher : is used to specify a function that maps incoming HTTP headers to gRPC metadata
* HeaderMatcher : is a custom function defined elsewhere in the code that determines how HTTP headers should be translated to gRPC metadata

### HeaderMatcher

HeaderMatcher is a custom function you provide to determine which headers to match and how to transform them. It accept the string and specifies weather to access the value of HTTP header by different metadata key, set the value of metadata or not.
[https://medium.com/media/89b084f13da75b51d20bb1e4bb166892/href](https://medium.com/media/89b084f13da75b51d20bb1e4bb166892/href)

In REST api we can access header at controller right. Similarly in gRPC we can access metadata at handler.
[https://medium.com/media/f2c2291734da3a60235fa0d9675f202d/href](https://medium.com/media/f2c2291734da3a60235fa0d9675f202d/href)
### Request/Response

Let’s use curl for request. You are free to use any API testing client for this.

```
curl -v --location 'http://localhost:8081/v1/todo' \
--header 'X-Required-Header: required' \
--header 'X-Alias-Header: alias' \
--header 'X-Nothing: nothing' \
--header 'Content-Type: application/json' \
--data '{
    "name": "todo",
    "description": "desc"
}'
```

It gives following response.

```
* Trying [::1]:8081...
* Connected to localhost (::1) port 8081
> POST /v1/todo HTTP/1.1
> Host: localhost:8081
> User-Agent: curl/8.4.0
> Accept: */*
> X-Required-Header: required
> X-Alias-Header: alias
> X-Nothing: nothing
> Content-Type: application/json
> Content-Length: 49
>
< HTTP/1.1 200 OK
< Content-Type: application/json
< Grpc-Metadata-Content-Type: application/grpc
< Grpc-Metadata-Location: Nepal
< Grpc-Metadata-Timestamp: May 26 20:44:54.264074000
< Date: Sun, 26 May 2024 14:59:54 GMT
< Content-Length: 93
<
* Connection #0 to host localhost left intact
{
  "name": "todo",
  "description": "desc",
  "done": false,
  "id": "00ca0ddb-21a5-4c28-9146-574ff6623f13"
}
```

From the response you can see that header sent by gRPC has prepended the Grpc-Metadata to the metadata key we have passed.

ie. Grpc-Metadata-Location and Grpc-Metadata-Timestamp

For complete project link you can get [here](https://github.com/mukezhz/learn/tree/main/golang/grpc/todo).

Thank you!!!

धन्यवाद 🇳🇵
![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=81f68241ed6c)
---

[Integrating gRPC with REST for Enhanced Web Development 🤝 Part II](https://articles.wesionary.team/integrating-grpc-with-rest-for-enhanced-web-development-part-ii-81f68241ed6c) was originally published in [wesionaryTEAM](https://articles.wesionary.team/) on Medium, where people are continuing the conversation by highlighting and responding to this story.