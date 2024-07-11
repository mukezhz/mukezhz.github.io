---
title: "Integrating gRPC with REST for Enhanced Web Development"
description: "Integrating gRPC with REST for Enhanced Web Development"
date: "Apr 25, 2024"
tags:
  - Medium
  - grpc-gateway
  - golang
  - rest-api
  - grpc-client
  - grpc
link: "https://articles.wesionary.team/integrating-grpc-with-rest-for-enhanced-web-development-18a66fcebd9d?source=rss-9b846a86b10c------2"
image: "https://cdn-images-1.medium.com/max/1024/1*BcbMyVY8_M9SgFAsOFdcww.png"
---
Enhancing Web Development by Seamlessly Integrating gRPC’s Performance with REST’s Accessibility Using gRPC Gateway.

**TL;DR:**

Explore how integrating gRPC with REST via gRPC Gateway allows developers to leverage the efficiency of gRPC while maintaining the simplicity and accessibility of REST for web applications.

### gRPC:

#### A high performance, open source universal RPC framework

![](https://cdn-images-1.medium.com/max/1024/1*BcbMyVY8_M9SgFAsOFdcww.png)

gRPC req/res

I have been researching about gRPC which is faster uses http2 protocol benefits. It can handle 4 types of methods:

1. **Unary RPC(Request/Reply)**: Client will send a single request and get a single response
2. **Client streaming RPC**: Client will send many request and get a single response
3. **Server streaming RPC**: Client will send a single request and get many response
4. **Bidirectional streaming RPC**: Client can send many request as well as server can send many response

#### Other terms:

* **Deadlines/Timeout**: allows clients to specify how long they are willing to wait for an RPC to complete before the RPC is terminated with a DEADLINE\_EXCEEDED error
* **RPC Termination**: It’s possible for a server to decide to complete before a client has sent all its requests
* **Cancelling an RPC**: Either server or client can cancel the RPC at any time
* **Metadata**: information about a particular RPC call (such as [authentication details](https://grpc.io/docs/guides/auth/)) in the form of a list of key-value pairs, where the keys are strings and the values are typically strings, but can be binary data
* **Channel**: A gRPC channel provides a **connection to a gRPC server** on a **specified host and port**. It is used when creating a **client stub**. Clients can specify channel arguments to modify gRPC’s default behavior, such as switching message compression on or off. A channel has state, including connected and idle.

> **STUB:** In the general context, a stub is a piece of program (typically a function or an object) that encapsulates the complexity of invoking another program (usually located on another machine, VM, or process — but not always, it can also be a local object)

By default, gRPC uses [Protocol Buffers](https://protobuf.dev/overview), Google’s mature open source mechanism for serializing structured data (although it can be used with other data formats such as JSON). ie by default the implementation gRPC uses protocol buffer as IDL(Interface Definition Language).

In gRPC, a client application can directly call a method on a server application on a different machine as if it were a local object, making it easier for you to create distributed applications and services

> Enough of theory lets implement. 🎉

### Implementation:

Lets try implementing gRPC for golang. In order to implement gRPC you need to install protoc a protobuf compiler, plugin of protoc for a particular language and a proto file.

1\. **Protoc Installation:**

[https://grpc.io/docs/protoc-installation/](https://grpc.io/docs/protoc-installation/)

2**. Install the protoc plugin for golang \[because I am implementing gRPC for golang\]:**

go install github.com/golang/protobuf/protoc-gen-go@latest

3\. Go natively support gRPC but if you are implementing gRPC in another language you might need to install third party packages/libraries.

4\. Generate a golang file by compiling proto file.

5\. Use the generated file and implement its connection.

Before this lets talk about protocol buffer.

Syntax of protocol buffer: todo.proto

```
syntax="proto3";

package proto.v1;

// after build go package github.com/mukezhz/learn/golang/grpc/todo/pb will be created
option go_package = "github.com/mukezhz/learn/golang/grpc/todo/pb";

// DTO of todo creation request
message CreateTodoRequest {
   string name = 1;
   string description = 2;
   bool done = 3;
}

// DTO of todo creation response
message CreateTodoResponse {
   string name = 1;
   string description = 2;
   bool done = 3;
   string id = 4;
}

// Method related to Todo
service TodoService {
   rpc CreateTodo(CreateTodoRequest) returns (CreateTodoResponse) {}
}
```

As you can see protocol buffer is really clear and strict about type. And for api call client does need to have a proto file as well as server need to have same proto file.

Using proto file we are able to generate types for **marshaling** and **unmarshaling** types for different language for example if you consider a type generation from above proto file. You will be getting something like below:

```
type CreateTodoRequest struct {
 state         protoimpl.MessageState
 sizeCache     protoimpl.SizeCache
 unknownFields protoimpl.UnknownFields

 Name        string `protobuf:"bytes,1,opt,name=name,proto3" json:"name,omitempty"`
 Description string `protobuf:"bytes,2,opt,name=description,proto3" json:"description,omitempty"`
 Done        bool   `protobuf:"varint,3,opt,name=done,proto3" json:"done,omitempty"`
}
```

> converting message to struct → unmarshaling

> converting struct to message → marshaling

**Note**: you can see that it is converted to struct which is valid in golang and added other stuffs for its internal implementation. Similarly in case of java it will convert to class.

> **These fields are used by the protobuf runtime to manage and optimize the behavior of the serialized data and its used internally, developer won’t be directly using it.**

> Short Explanation:

> **state protoimpl.MessageState: helps manage the memory layout of the protobuf messages**

> **sizeCache protoimpl.SizeCache: used to cache the size of the protobuf message once it has been computed**

> **unknownFields protoimpl.UnknownFields: stores any fields received during deserialization that are not defined in the protobuf schema**

In order to generate go files which have type we use the following command:

```
SRC_DIR=proto
DST_DIR=pb

protoc -I${SRC_DIR} \
  --go_out=${DST_DIR} --go_opt=paths=source_relative \
  proto/*.proto


# This will generate todo.pg.go file. My all proto files are in proto folder.
```

**NOTE: — go\_out flag is used for this**

Since in proto file we can see that it’s containing service where multiple methods can be defined.

So we need a way to generate the server and client interfaces and how they communicate with each other too.

Install the protoc plugin for **grpc golang**:

go install google.golang.org/grpc/cmd/protoc-gen-go-grpc@latest

Again its easy you just need to do the following:

```
SRC_DIR=proto
DST_DIR=pb

protoc -I${SRC_DIR} \
  --go-grpc_out=${DST_DIR} --go-grpc_opt=paths=source_relative \
  proto/*.proto

# This will generate todo_grpc.pg.go file. My all proto files are in proto folder.
```

**NOTE: — go-gprc\_out flag is used for this**

Generally we would be combining both flag like below:

```
SRC_DIR=proto
DST_DIR=pb

protoc -I${SRC_DIR} \
  --go_out=${DST_DIR} --go_opt=paths=source_relative \
  --go-grpc_out=${DST_DIR} --go-grpc_opt=paths=source_relative \
  proto/*.proto

# This will generate todo.pb.go and todo_grpc.pb.go file. My all proto files are in proto folder.
```

**Up to now we have got:**

* Data types which our programming language can understand.
* Client and Server interface for that language .

**Server Interface:**

* interface that defines the methods that can be implemented on the server.
* This would be an interface with methods corresponding to each RPC method defined in the service.

```
type TodoServiceServer interface {
 CreateTodo(context.Context, *CreateTodoRequest) (*CreateTodoResponse, error)
 mustEmbedUnimplementedTodoServiceServer()
}

// UnimplementedTodoServiceServer must be embedded to have forward compatible implementations.
type UnimplementedTodoServiceServer struct {
}
```

**Client Interface:**

* a client stub is generated which can be used in client applications to make calls to the server.
* This stub provides methods that you can call directly in your client code, abstracting away the details of how the data is sent and received over the network

```
type TodoServiceClient interface {
 CreateTodo(ctx context.Context, in *CreateTodoRequest, opts ...grpc.CallOption) (*CreateTodoResponse, error)
}

type todoServiceClient struct {
 cc grpc.ClientConnInterface
}

func NewTodoServiceClient(cc grpc.ClientConnInterface) TodoServiceClient {
 return &todoServiceClient{cc}
}

func (c *todoServiceClient) CreateTodo(ctx context.Context, in *CreateTodoRequest, opts ...grpc.CallOption) (*CreateTodoResponse, error) {
 out := new(CreateTodoResponse)
 err := c.cc.Invoke(ctx, TodoService_CreateTodo_FullMethodName, in, out, opts...)
 if err != nil {
  return nil, err
 }
 return out, nil
}
```

As you can see the client interface has been implemented. We just need to implement the server interface method.

On implementing the server interface your server is able to handle the gRPC request. This is similar to normal http server implementation. Here is the implementation:

```
// on generating the todo_grpc there you can find this need to be embedded for forward compatibility so we are embedding it
type TodoServer struct {
    todo.UnimplementedTodoServiceServer

    service TodoService
}

// model for the todo
type TodoModel struct {
 ID          uint
 Name        string
 Description string
 Done        bool
}

// say already have service and repository layer to save it.

// implementing the server interface
func (s *server) CreateTodo(ctx context.Context, req *todo.CreateTodoRequest) (*todo.CreateTodoResponse, error) {
    log.Printf("Received: %v", req.GetName())
    // add logic to save todo in your database
    t := s.service.SaveTodo(
     TodoModel {
      Name: req.GetName(),
      Description: req.GetDescription(),
      Done: req.GetDone(),
     },
    )

    return &todo.CreateTodoResponse{Id: t.ID, Name: t.Name, Description: t.Description), Done: t.Done}, nil
}

func runGRPC() {
    // listening tcp connection in 50051
    lis, err := net.Listen("tcp", ":50051")
    if err != nil {
        log.Fatalf("failed to listen: %v", err)
    }
    // createing a gRPC server which has no service registered and has not started to accept requests yet.
    s := grpc.NewServer()

    // registering the todo service to the server we have generated
    todo.RegisterTodoServiceServer(s, &TodoServer{})
    log.Printf("server listening at %v", lis.Addr())

    // Serve accepts incoming connections on the listener lis, creating a new ServerTransport and service goroutine for each.
    if err := s.Serve(lis); err != nil {
        log.Fatalf("failed to serve: %v", err)
    }
}

func main() {
 runGRPC()
}
```

As simple as that just this much of code for creating the gRPC server.

We will be getting type safe contract between client and server. As you can see this is schema first development. We are creating the contract between the client and the server before writing the code which has lots of advantages.

> Although gRPC has many benefits, REST remains the king of the internet due to its simplicity and native support in browsers.

### REST 🤴:

REST is easy to implement and browser natively supports it.

Implementation of REST:

1. **Create an instance of http server**
2. **Assign handler to a specific route using http server**
3. **No need to install third party packages \[most of the language contains the http package in their standard library\]**
4. **Start listening port**

What if we could write server code in gRPC, use it where possible, and switch to REST where gRPC isn’t supported, like in browsers? And what if you could access gRPC functions through a REST endpoint? That would be really convenient, right?

![](https://cdn-images-1.medium.com/max/1024/1*9jmsJa7_nlaHoTtw1fiKkw.png)

flow showing REST to gRPC

This is possible via gRPC gateway 🕶️. We will be implementing our business logic in gRPC and gRPC gateway will be converting our HTTP 1.1 REST request to gRPC.

We just need to modify few thing in proto:

```
syntax="proto3";

package proto.v1;

option go_package = "github.com/mukezhz/learn/golang/grpc/todo/pb";

// this annotation.proto is required for the gRPC gateway
import "google/api/annotations.proto";


message CreateTodoRequest {
   string name = 1;
   string description = 2;
   bool done = 3;
}

message CreateTodoResponse {
   string name = 1;
   string description = 2;
   bool done = 3;
   string id = 4;
}

service TodoService {
 // /v1/todo is mapped to CreateTodo method
   rpc CreateTodo(CreateTodoRequest) returns (CreateTodoResponse) {
      option (google.api.http) = {
        post: "/v1/todo"
        body: "*"
      };
    }
}
```

Now generate the gateway file using following command:

```
SRC_DIR=proto
DST_DIR=pb

protoc -I${SRC_DIR} \
  --go_out=${DST_DIR} --go_opt=paths=source_relative \
  --go-grpc_out=${DST_DIR} --go-grpc_opt=paths=source_relative \
  --grpc-gateway_out=${DST_DIR} \
  --grpc-gateway_opt paths=source_relative \
  --grpc-gateway_opt generate_unbound_methods=true \
  proto/*.proto
```

**NOTE: If you are using protoc for file generation you need to explicitly annotations.proto file which you can find**[**here**](https://github.com/googleapis/googleapis/blob/master/google/api/annotations.proto)**.**

Instead of using protoc we can use the buf. buf can install dependency if you specify the proto dependency in buf.yaml file.

**Install buf**: [https://buf.build/docs/installation](https://buf.build/docs/installation)

In buf you just need to write the yaml file and you will be getting same stuffs what you are getting using protoc. Install the buf and generate config file using buf mod init build.buf/mukezhz/todo

```
# content of: buf.gen.yaml
version: v1
plugins:
  - plugin: go
    out: gen/go
    opt:
      - paths=source_relative
  - plugin: go-grpc
    out: gen/go
    opt:
      - paths=source_relative
  - plugin: grpc-gateway
    out: gen/go
    opt:
      - paths=source_relative
      - generate_unbound_methods=true

# content of: buf.yaml
version: v1
name: buf.build/mukezhz/todo
deps:
  - buf.build/googleapis/googleapis
breaking:
  use:
    - FILE
lint:
  use:
    - DEFAULT
```

Generate the go file from proto: buf gen

There won’t be much changes in our implementation we just need to:

* Implement the gRPC server interface \[Already DONE\]
* Listen the HTTP request and map the request to the gRPC method

```
func runHTTP() error {

 ctx := context.Background()
 ctx, cancel := context.WithCancel(ctx)
 defer cancel()

 mux := runtime.NewServeMux()
 // gRPC client to call the method
 opts := []grpc.DialOption{grpc.WithTransportCredentials(insecure.NewCredentials())}
 // registering the mux to the gRPC endpoint where it is running
 err := pb.RegisterTodoServiceHandlerFromEndpoint(ctx, mux, "localhost:50051", opts)
 if err != nil {
  return err
 }
 log.Println("HTTP server listening on port 8081")
 return http.ListenAndServe(":8081", mux)
}

func main() {
  // running gRPC in go thread
 go runGRPC()
 // running HTTP server in go thread
 go runHTTP() {
  if err := run(); err != nil {
   grpclog.Fatal(err)
  }
 }()
 select {} // Block main from exiting
}
```

Now when you hit POST req to the endpoint [http://localhost:8081/v1/todo](http://localhost:8081/v1/todo)

You will be getting response which is being handled by gRPC.

This is the part 1 of the gRPC and REST series. Stay tuned for part two of this where we will be covering middleware and header handling.

If you want to implement a chat application using gRPC, please read Dipesh Dulal’s blog [source link](https://articles.wesionary.team/grpc-console-chat-application-in-go-dd77a29bb5c3).

Thank you!!!

धन्यवाद 🇳🇵
![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=18a66fcebd9d)
---

[Integrating gRPC with REST for Enhanced Web Development 🤝](https://articles.wesionary.team/integrating-grpc-with-rest-for-enhanced-web-development-18a66fcebd9d) was originally published in [wesionaryTEAM](https://articles.wesionary.team/) on Medium, where people are continuing the conversation by highlighting and responding to this story.