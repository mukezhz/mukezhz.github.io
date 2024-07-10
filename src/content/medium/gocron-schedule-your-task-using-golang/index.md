---
title: "gocron | Schedule your task using golang"
description: "gocron | Schedule your task using golang"
date: "Jun 3, 2024"
tags:
  - Medium
  - cronjob
  - scheduled-tasks
  - schedule
  - go
  - go-cron
link: "https://articles.wesionary.team/gocron-schedule-your-task-using-golang-4b110d6ec862?source=rss-9b846a86b10c------2"
image: "https://cdn-images-1.medium.com/max/1024/1*rY3bXwCYouTBjDTDkKQpWg.png"
---
Easy and fluent Go cron scheduling. This is a fork from [jasonlvhit/gocron](https://github.com/jasonlvhit/gocron).

![](https://cdn-images-1.medium.com/max/1024/1*rY3bXwCYouTBjDTDkKQpWg.png)

image from [crontab guru](https://crontab.guru/)

### TL;DR:

You can schedule your task daily, weekly, monthly, one time or use cron to execute the task using the golang itself.

I was familiar with the @Scheduled annotation of [**micronaut**](https://guides.micronaut.io/latest/micronaut-scheduled-gradle-java.html)\[**Java Framework**\] which was really awesome in Java world. But in go lang world, I have been using gin framework. There was a requirement to execute the task each day at 12 am. There were 3 solutions:

1. Use \*nix cron
2. Implement scheduler yourself
3. Use third party package

Yes I choose option 3 because it is easy and we don’t need to re-invent the wheel again.

#### **I found two packages:**

1. [https://github.com/jasonlvhit/gocron:](https://github.com/jasonlvhit/gocron:) \[Last update was 3years ago\]
2. [https://github.com/go-co-op/gocron](https://github.com/go-co-op/gocron): \[Fork of the above package and maintained regularly\]

**Note from current maintainers:** A currently maintained fork of this project has been migrated to [https://github.com/go-co-op/gocron](https://github.com/go-co-op/gocron)

> **Disclaimer:** we (the maintainers) tried, with no luck, to get in contact with Jason (the repository owner) in order to add new maintainers or leave the project within an organization. Unfortunately, he hasn’t replied for months now (March, 2020).

> So, we decided to move the project to a new repository (as stated above), in order to keep the evolution of the project coming from as many people as possible. Feel free to reach over!

#### **Why using backend web server scheduler is better than using OS cronjob?**

* Environment-independent ie. works on all operating system where backend language is supported
* Simplifies deployment and operation across diverse environments
* Integrate into the application’s codebase and configuration files ie. version controlled
* More adaptable to dynamic scaling requirements
* Running as part of the application, backend schedulers have direct access to the application’s context, resources, and services
* Better error handling and logging
* Can be tested along with the application using standard testing practices
* Operate within the application’s security context, simplifying permission management and reducing the risk of security issues associated with separate or elevated permissions
* Not all \*nix environment support enhanced cron
* If you are using **PaaS** and in case if **PaaS** doesn’t provide scheduling or cron you can still schedule your task

#### Let’s understand it.

**There are four concepts you need to know in order to use the gocron.**

1. Task
2. Job
3. Scheduler
4. Executor

**Task:**

* It is go function which needs to be execute by the Job.

gocron.NewTask(  
func(a string, b int) {  
// do things  
},  
"hello",  
1,  
),  
  
a and b are the parameter  
we are passing "hello" and 1 to the function

**Job:**

* Job encapsulate the tasks
* Contains information when task should run:
* **Duration:** run at a fixed time.Duration
* **Random Duration:** run at a random time.Duration between a min and max.
* **Cron:** run using a crontab.
* **Daily:** run every x days at specific times.
* **Weekly:** run every x weeks on specific days of the week and at specific times.
* **Monthly:** run every x months on specific days of the month and at specific times.
* **One Time:** run once at a specific time. These are non-recurring jobs.

**Scheduler:**

* Scheduler keeps track of all the jobs and sends each job to the executor when it is ready to be run.

**Executor:**

* The executor calls the job’s task and manages the complexities of different job execution timing requirements (e.g. singletons that shouldn’t overrun each other, limiting the max number of jobs running)

**Note:** For complete detail you can read their [docs](https://github.com/go-co-op/gocron).

#### Let the code begin.

**Steps:**

* Install the gocron package

go get github.com/go-co-op/gocron/v2

* Create an instance of scheduler

s, err := gocron.NewScheduler()

* Create a task:

task := gocron.NewTask(  
func(a string, b int) {  
// do things  
},  
"hello",  
1,  
)

* Assign a task to job:

j, err := s.NewJob(  
gocron.DurationJob(  
10\*time.Second,  
),  
gocron.NewTask(task),  
)

* start the schedule

s.Start()

**Let’s implement for the following case:**

— The task need to run every 12am each day and timezone is Asia/Kathmandu.

package main  
  
import (  
"fmt"  
"time"  
  
"github.com/go-co-op/gocron/v2"  
)  
  
func main() {  
// time location of Asia/Kathmandu  
ktmLocation, err := time.LoadLocation("Asia/Kathmandu")  
if err != nil {  
// handle error  
}  
  
// create a scheduler  
// assign time to our location  
s, err := gocron.NewScheduler(  
gocron.WithLocation(  
ktmLocation,  
),  
)  
if err != nil {  
// handle error  
}  
  
task := gocron.NewTask(  
func(a string, b int) {  
// do things  
// your business logic  
},  
"hello",  
1,  
)  
  
// cron tab which run at 12am  
// 2nd argument boolean is used for enhance cron  
// check below for detail  
jobType := gocron.CronJob(  
"0 0 \* \* \*",  
false,  
)  
  
// add a job to the scheduler  
j, err := s.NewJob(jobType, task)  
if err != nil {  
// handle error  
}  
  
// each job has a unique id  
fmt.Println(j.ID())  
  
// start the scheduler  
s.Start()  
  
// block until you are ready to shut down  
select {  
case <-time.After(time.Minute):  
}  
  
// when you're done, shut it down  
err = s.Shutdown()  
if err != nil {  
// handle error  
}  
}

Finished. Its really simple right.

**CRON:**

1. **Traditional Cron (Minute-Level Precision):** operates at minute-level precision, you can’t specify every second
2. **Enhanced Cron (Second-Level Precision) \[gocron also support this\]:** Some systems, like Quartz scheduler or modern cron-like task schedulers (e.g., some implementations in programming libraries), allow for second-level scheduling

Please refer to the docs its really simple to use.

**README:** [https://github.com/go-co-op/gocron?tab=readme-ov-file#gocron-a-golang-job-scheduling-package](https://github.com/go-co-op/gocron?tab=readme-ov-file#gocron-a-golang-job-scheduling-package)

**Go Docs:** [https://pkg.go.dev/github.com/go-co-op/gocron/v2#section-readme](https://pkg.go.dev/github.com/go-co-op/gocron/v2#section-readme)

**Other Feature of gocron:**

* Support distributed instance
* Job event can trigger action ie. listeners can be added to a job
* Many job and scheduler options are available:
* [**Job options**](https://pkg.go.dev/github.com/go-co-op/gocron/v2#JobOption)**:** pass argument to **NewJob**
* [**Global job options**](https://pkg.go.dev/github.com/go-co-op/gocron/v2#WithGlobalJobOptions)**:** pass argument to **NewScheduler’s** WithGlobalJobOptions option
* [**Scheduler options**](https://pkg.go.dev/github.com/go-co-op/gocron/v2#SchedulerOption): pass argument to **NewScheduler**
* Logs can be enabled: just implement the [Logger](https://pkg.go.dev/github.com/go-co-op/gocron/v2#Logger) interface
* [**Monitor**](https://pkg.go.dev/github.com/go-co-op/gocron/v2#Monitor)**:** Metrics may be collected from the execution of each job.
* Support testing

> Feel free to contact me at [linkedin](https://linkedin.com/in/mukezhz) if you have any confusion.

Thank you!!!

धन्यवाद 🇳🇵
![](https://medium.com/_/stat?event=post.clientViewed&referrerSource=full_rss&postId=4b110d6ec862)
---

[gocron | Schedule your task using golang](https://articles.wesionary.team/gocron-schedule-your-task-using-golang-4b110d6ec862) was originally published in [wesionaryTEAM](https://articles.wesionary.team/) on Medium, where people are continuing the conversation by highlighting and responding to this story.