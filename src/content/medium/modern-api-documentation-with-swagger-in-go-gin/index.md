---
title: "Modern API Documentation with Swagger in Go GIN"
description: "Modern API Documentation with Swagger in Go GIN"
date: "Dec 31, 2024"
tags:
  - Medium
  - swagger
  - gin
  - api
  - go
  - docs
link: "https://articles.wesionary.team/modern-api-documentation-with-swagger-in-go-gin-2aee10cb7bb9?source=rss-9b846a86b10c------2"
image: "https://cdn-images-1.medium.com/max/1024/0*kPWF3Xsq3fpbQW2U.png"
---
### A Guide for Gin Framework Users for API docs generation

![](https://cdn-images-1.medium.com/max/1024/0*kPWF3Xsq3fpbQW2U.png)

scalar api docs

#### Introduction:

As a developer, have you ever faced issues while working on web development with a REST API — particularly related to changes in backend and frontend DTOs — this article is for you.

```
B -> Backend Developer
F -> Frontend Developer

B changes the DTO and F keeps retrying.
After frustration 😫 
F ask for B and then 
B replies Sorry I forgot to inform 🙇‍♂️.
```

If you have faced this issue then you will enjoy the whole article.

For this there are multiple solution:

1. Maintain api collection in api clients like: Bruno, Postman and many [more](https://github.com/mrmykey/awesome-http-clients/blob/main/Readme.md) and don’t forgot to update
2. Create swagger docs manually and don’t forgot to update
3. Use API first development
4. Generate API docs from codebase

> Above them 3rd and 4th are better option than 1st and 2nd.

There are multiple web framework which provides api docs from codebase. Like:

python \[[fastapi](https://fastapi.tiangolo.com/)\], javascript \[[elysiajs](https://elysiajs.com/)\], golang\[[huma.rocks](https://huma.rocks/)\], any many more…

#### API docs generation in GIN

> But if you still want to use gin and get api docs generation from code then you are at right place.

There are different way to generate api docs from code base:

* Write comments in controller [gin-swagger](https://github.com/swaggo/gin-swagger)
* Use wrapper library for gin router [swag](https://github.com/savaki/swag)

Since gin doesn’t provide api docs from code base by default and writing comments above controller introduce code smell.

> Precaution: swag package hasn’t been updated since last 7 years.

In this article we will be generating api docs from code base ie. api docs from gin’s codebase using swag library.

#### Simple REST API implemented in gin
[https://medium.com/media/169d76683c3abccf1dcbc7e69860c4f3/href](https://medium.com/media/169d76683c3abccf1dcbc7e69860c4f3/href)

We will be adding api docs for the router above.

#### API docs with swag 🤘

Let’s install swag package:

```
go get github.com/savaki/swag
```

Instead of registering route by RegisterUserRoute method return \[\]\*swagger.Endpoint.

Here we will be adding meta data for each route also we will be adding request and response payload.

```
func (u *UserRoute) RegisterUserRoute() []*swagger.Endpoint {
 endpoints := []*swagger.Endpoint{}

 getUserByID := endpoint.New(
  http.MethodGet,
  "/users/:id",
  "Get User By ID",
  endpoint.Path("id", "string", "User ID", true),
  endpoint.Handler(u.userController.getUserByID),
  endpoint.Response(http.StatusOK, User{}, "Get User By ID Response"),
 )
 addUser := endpoint.New(
  http.MethodPost,
  "/users",
  "Add User",
  endpoint.Handler(u.userController.addUser),
  endpoint.Body(User{}, "Add User Request Payload", true),
  endpoint.Response(http.StatusCreated, gin.H{}, "Add User Response"),
 )
 ... // previous code

 endpoints = append(endpoints, getUserByID, addUser, ...)
 return endpoints
}
```

Also one helper function is created just to combine endpoints but we have only user endpoints so it doesn’t have too much impact for now.

```
func combine(endpoints []*swagger.Endpoint) []*swagger.Endpoint {
 return append(endpoints, endpoints...)
}
```

Now lets introduce SwagRoute struct which wrap router and register the routes of gin.

```
// SWAG ROUTE
type SwagRoute struct {
 router *gin.Engine
}

func NewSwagRoute(router *gin.Engine) *SwagRoute {
 return &SwagRoute{router: router}
}
```

Registering route and add scalar docs which will add pretty ui for api.

```
func (s *SwagRoute) RegisterRoutes(endpoints []*swagger.Endpoint) {
 api := swag.New(
  swag.Endpoints(endpoints...),
  swag.Description("THis is the test description"),
  swag.Version("1.0.0"),
  swag.Title("Test Title"),
 )
 api.Walk(func(path string, endpoint *swagger.Endpoint) {
  h := endpoint.Handler.(func(c *gin.Context))
  path = swag.ColonPath(path)

  s.router.Handle(endpoint.Method, path, h)
 })

 enableCors := true
 s.router.GET("/swagger", gin.WrapH(api.Handler(enableCors)))
 s.router.LoadHTMLGlob("templates/*.html")
 s.router.GET("/docs", func(ctx *gin.Context) {
  ctx.Header("Content-Type", "text/html")
  scheme := "http://"
  if ctx.Request.TLS != nil {
   scheme = "https://"
  }
  content := fmt.Sprintf(`
  <!DOCTYPE html>
  <html>
  <head>
   <title>Scalar API Reference</title>
   <meta charset="utf-8" />
   <meta name="viewport" content="width=device-width, initial-scale=1" />
  </head>
  <body>
   <!-- Need a Custom Header? Check out this example https://codepen.io/scalarorg/pen/VwOXqam -->
   <script
   id="api-reference"
   type="application/json"
   data-url="%s"
   ></script>
   <script src="https://cdn.jsdelivr.net/npm/@scalar/api-reference"></script>
  </body>
  </html>
  `, scheme+ctx.Request.Host+"/swagger")
  ctx.String(http.StatusOK, content)
 })
}go
```

Again lets change the main function:

```
func main() {
 r := gin.Default()
 ... // previous code
 allUserEndpoint := userRoute.RegisterUserRoute()
 allEnpointsForSwag := combine(allUserEndpoint)
 // swag route initiated by passing gin router
 swagRoute := NewSwagRoute(r)
 // registering all routes with pretty api docs
 swagRoute.RegisterRoutes(allEnpointsForSwag)
 r.Run(":8000")
}
```

Finally execute the program:

```
go run .
```

On navigating to localhost:8000/docs: 🎉

![](https://cdn-images-1.medium.com/max/1024/1*Hd85jXBONBeVI4VTYY7-vg.png)

gin’s api docs using scalar ui

You can send request from the UI. When the code is changed and deployed frontend will get latest update.

This enable working frontend and backend in async manner.

Here is the full gist of the code: [https://gist.github.com/mukezhz/3ee41a0ba7e5689193e7c959e734c645](https://gist.github.com/mukezhz/3ee41a0ba7e5689193e7c959e734c645)

If you are using geng to scaffold project and you like to add this docs in your project then here’s the example: [https://github.com/mukezhz/gin-swagger](https://github.com/mukezhz/gin-swagger)

Feel free to connect with me: [LinkedIn](https://linkedin.com/in/mukezhz)

Thank you!!!

धन्यवाद 🇳🇵
![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=2aee10cb7bb9)
---

[Modern API Documentation with Swagger in Go GIN](https://articles.wesionary.team/modern-api-documentation-with-swagger-in-go-gin-2aee10cb7bb9) was originally published in [wesionaryTEAM](https://articles.wesionary.team/) on Medium, where people are continuing the conversation by highlighting and responding to this story.