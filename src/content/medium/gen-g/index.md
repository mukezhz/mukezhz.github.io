---
title: "Gen-G"
description: "Gen-G"
date: "Jan 3, 2024"
tags:
  - Medium
  - programming
  - go
  - cli
  - command-line-tools
  - clean-architecture
link: "https://articles.wesionary.team/gen-g-31c3ed7e1e4f?source=rss-9b846a86b10c------2"
image: "https://cdn-images-1.medium.com/max/440/1*bBxpC98vN0hFnlRTnbVKOQ.png"
---
### Gen-G | A flexible go lang project generator

#### Introduction

![](https://cdn-images-1.medium.com/max/440/1*bBxpC98vN0hFnlRTnbVKOQ.png)

geng: Generate Golang Project

geng - **Gen**erate **G**olang Project

Inspired by Nest CLI, geng is command-line interface tool that helps you to initialize, develop, and maintain your Go gin applications.

#### Why yet another cli tool?

We’ve been utilizing the [**wesionaryTEAM**](https://github.com/wesionaryTEAM/go_clean_architecture) template to kickstart projects and eliminate boilerplate code. While templates are helpful, I sought a more seamless solution. Consequently, I opted to create a CLI tool for project generation.

My experience with Django CLI, Nest CLI, and Micronaut CLI, which facilitate the creation of structured projects and the addition of modules or apps, inspired me to design a CLI embodying these functionalities while also replicating the [**wesionaryTEAM**](https://github.com/wesionaryTEAM/go_clean_architecture)’s unique folder architecture.

Although I discovered some impressive project generators listed in the reference section below, none of them aligned with the specific project structure of [**wesionaryTEAM**](https://github.com/wesionaryTEAM/go_clean_architecture), leading me to develop this project.

In the following section, I delve into a technical explanation of the tool’s development.

#### How to use?

geng is actually pretty simple to use. You just need to install the go lang or you can directly download the binary from [here](https://github.com/mukezhz/geng/releases/tag/v0.3.4) and add it binary directory to your PATH variable.

Install using go:

go install github.com/mukezhz/geng@latest

There might be a chance that your go/bin directory is not included in your environment's PATH variable.

So to add in \*nix operating system you can do the following:

// For zsh: \[Open.zshrc\] & For bash: \[Open .bashrc\]  
// Add the following:  
export GO\_HOME="$HOME/go"  
export PATH="$PATH:$GO\_HOME/bin"  
  
// For fish: \[Open config.fish\]  
// Add the following:  
fish\_add\_path -aP $HOME/go/bin

Now after installation, lets create a project:

**Create a project:** geng new

This command will open the interactive terminal which is created using [bubble tea](https://github.com/charmbracelet/bubbletea)

Fill the project name, project module, author, project description, go version, directory.

Project Name and Project Module are required field. They have \*as well:

![](https://cdn-images-1.medium.com/max/914/1*5tqPcdaIinkNT7C4eDbLxA.png)

Add Project Name

Author, Project Description, Go Version, Directory are optional field. They have \[Optional\] as well:

![](https://cdn-images-1.medium.com/max/914/1*8ESpFEZqMaRumnba69DHGg.png)

Fill Project Description

Once you fill all the detail geng asked for. A new directory is created in the same directory where you are using the command geng.

You will be getting all the information immediately after you start a project.

> You will also get error message if the error occurs.

![](https://cdn-images-1.medium.com/max/1024/1*lOAu8enoBiXizoLkFSq9CA.png)

tasks list after project generation

After following the steps, you will be getting the following result:

![](https://cdn-images-1.medium.com/max/1024/1*jgAMKH4KC0k3J0gY6sOJAQ.png)

running project on port 5000 successfully

> Your project will start in port 5000. If your port is busy it will throw an error.

Note: Two route has been created:

* /health-check
* /api/hello

Now lets add one user related module.

geng gen mod

![](https://cdn-images-1.medium.com/max/492/1*Y4lOWG8jDwJQxmPYsT7mTw.png)

asking for module name

Result after entering user:

![](https://cdn-images-1.medium.com/max/770/1*KQzLtuHU7vGlpWFSxVJa4g.png)

information after user module is created

Now if you restart the project. You will be getting 3 routes:

![](https://cdn-images-1.medium.com/max/1024/1*vENdwpKJ0A_nya2AyegIJw.png)

Route: /api/user is added

For folder structure. You can read the README.md which is generated after using the geng new.

For now geng does this much tasks.

#### How I develop?

By coding 😅 xD, jokes apart I am going to explain in short how I develop it.

* I wanted a project which scaffold a basic template, it was not a problem for me since I already have [template](https://github.com/wesionaryTEAM/go_clean_architecture) and could easily inject variable using text/template.
* Project scaffolding was easy for me but the main problem was while generating module where I need to import the generated module and inject in fx. The Problem is that the import in go is not as easy as javascript or python import where knowing path lets us import. We need to know project module name to import in golang which is being done by below code.

func GetModuleNameFromGoModFile() (model.GoMod, error) {  
file, err := os.Open("go.mod")  
goMod := model.GoMod{}  
if err != nil {  
return goMod, err  
}  
defer func(file \*os.File) {  
err := file.Close()  
if err != nil {  
panic(err)  
}  
}(file)  
  
scanner := bufio.NewScanner(file)  
for scanner.Scan() {  
line := scanner.Text()  
if strings.HasPrefix(line, "module ") {  
// Extract module name  
parts := strings.Fields(line)  
if len(parts) >= 2 {  
goMod.Module = parts\[1\]  
}  
} else if strings.HasPrefix(line, "go ") {  
// Extract Go version  
parts := strings.Fields(line)  
if len(parts) >= 2 {  
goMod.GoVersion = parts\[1\]  
}  
}  
}  
  
if err := scanner.Err(); err != nil {  
return goMod, err  
}  
  
return goMod, nil  
}

* This was the tricky part, I solve this by using go/ast, where I parse the module.gofile and import the package generated package. You can check it [here](https://github.com/mukezhz/geng/blob/c1b8d12c85448171d740956cfe90e6a088b2f176/pkg/utility/ast.go#L14C9-L14C9).

func ImportPackage(node \*ast.File, projectModule, packageName string) {  
// currently I have only one template so currently it is hard coded  
// projectModule:- name of the project module which in inside go.mod  
// domain:- hard coded value  
// features:- hard coded value  
// packageName:- the name of module you want to generate  
path := filepath.Join(projectModule, "domain", "features", packageName)  
importSpec := &ast.ImportSpec{  
Path: &ast.BasicLit{  
Kind: token.STRING,  
Value: fmt.Sprintf(\`"%v"\`, path),  
},  
}  
  
importDecl := &ast.GenDecl{  
Tok: token.IMPORT,  
Lparen: token.Pos(1), // for grouping  
Specs: \[\]ast.Spec{importSpec},  
}  
  
// Check if there are existing imports, and if so, add to them  
found := false  
for \_, decl := range node.Decls {  
genDecl, ok := decl.(\*ast.GenDecl)  
if ok && genDecl.Tok == token.IMPORT {  
genDecl.Specs = append(genDecl.Specs, importSpec)  
found = true  
break  
}  
}  
  
// If no import declaration exists, add the new one to Decls  
if !found {  
node.Decls = append(\[\]ast.Decl{importDecl}, node.Decls...)  
}  
}

* Last but not the not the least, The most important part of this project was the following code snippet which embeds the all the files inside template/wesionary directory in the build of the go project. It creates a file system which has the access to those embedded files.

//go:embed templates/wesionary/\*  
var templatesFS embed.FS

Complete source code is available [here: geng](https://github.com/mukezhz/geng)

#### Future Plans:

* geng add feature <feature name> will add feature already well tried and tested feature like auth
* geng add middleware <middleware>will add already tried and tested middleware
* geng add infra <infrastructure> <service>will add constructor and services like: s3 client and method related to s3 bucket
* geng gen <module name> -crud will generate crud having dummy model

> Feel free to try and contribute and give suggestion by opening [issue](https://github.com/mukezhz/geng/issues/new/choose).

I hope you like it.

Thank you 🙏

#### Reference:

* [https://goquick.dev/pages/gogen](https://goquick.dev/pages/gogen)
* [https://autostrada.dev/](https://autostrada.dev/)
* [https://gobuffalo.io/](https://gobuffalo.io/)
* [https://github.com/lacion/cookiecutter-golang](https://github.com/lacion/cookiecutter-golang)
* [https://github.com/gin-admin/gin-admin-cli](https://github.com/gin-admin/gin-admin-cli)
![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=31c3ed7e1e4f)
---

[Gen-G](https://articles.wesionary.team/gen-g-31c3ed7e1e4f) was originally published in [wesionaryTEAM](https://articles.wesionary.team/) on Medium, where people are continuing the conversation by highlighting and responding to this story.