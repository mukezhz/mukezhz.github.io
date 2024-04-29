---
title: Devops
date: "Mar 15 2022"
demoURL: ""
repoURL: ""
description: |
  Thinks what I did as a devops at Hamropatro.
tags:
  - devops
  - learning
  - hamropatro
---

<img src="/assets/devops/devops-toolchain.svg" alt="devops" width="400" height="300">

### When I was doing fellowship:

- Installed minikube and k3s at laptop
- Researched about Kubernetes because I was already familiary with docker I started from kubernetes
- Fixed linux issues of other fellow devops
- Created multiple VMs using Virtual Box and Qemu
- Install rke2 K8s distro on vms using ansible-playbook [I used qemu since it is light weight]
- Install ingress and load balancer
- Install Proxmox on laptop for testing
- Spin multiple vms on proxmox
- Gave presentation on topic "Containerization" to all other batch mates
- Gave presentation on topic "Kubernetes" to managers

### When I was associate Software engineer:

- Install [CSI](https://kubernetes-csi.github.io/docs/) for [open project](https://www.openproject.org/) uses [Digital Ocean spaces](https://cloud.digitalocean.com/spaces) as storage
- Removed [nginx ingress controller](https://docs.nginx.com/nginx-ingress-controller/) and install [contour](https://projectcontour.io/) ingress because after updating the RKE2 nginx ingress controller was installed
- Install [elasticsearch](https://www.elastic.co/) and setup [kibana](https://www.elastic.co/kibana/) for elastic search on K8s
- Deployed all service of [bus route project](https://bus-tracking.alpha.hamrostack.com/) in K8s
- Wrote python script to make backup of [scyllaDB](https://docs.scylladb.com/) and send the backup to digital ocean space using [s3cmd](https://s3tools.org/s3cmd)
- Fixed linux issues of interns
- Gave presentation on "GIT: The Version Control System" to interns
- Fixed ssl certificate issues
- Gave presentation on topic "Why containerization?" to interns
- Migrate one of the service name "Everest DB" to K8s which was deployed in docker stack before
- Developed [Hamro Chautari](https://chautari.hamropatro.com) in k8s and [livekit](https://livekit.io/) on VM and deployed it also added its metric in [Grafana](https://grafana.com/)
- Wrote Dockerfile of [Hamro Health](https://health.hamropatro.com) and deployed it in K8s
- Deployed machine learning project on kubernetes it was deployed on docker stack before
- Wrote flask api for machie learning project. Converted 4GB docker image to 1GB by writing efficient Dockerfile :D
- Deployed [Football service](https://football.hamropatro.com/) at the time of WorldCup 2022
- Installed [signoz](https://signoz.io/) for obervability tools and tested it
- Wrote multi stage Dockerfile for various project
- Fixed [mongoDB](https://www.mongodb.com/docs/manual/replication/) when deploying as replicaset
- Intalled mongoDB having version 5+ (changed CPU type of vm using proxmox)
- Fixed [Hamro Gift](https://gifts.hamropatro.com/) service. (The issue was on helm version LOL)
- Deployed [Apache Kafka](https://kafka.apache.org/) cluster, [Scylla](https://docs.scylladb.com/) cluster in VM which is used by Hamro Pay
- Setup [headscale](https://headscale.net/) vpn which is an open source, self-hosted implementation of the [Tailscale](https://tailscale.com/) control server
- Developed an [image uploader](https://image-uploader.hamropatro.com) service on Micronaut to upload image to digital ocean spaces using api call having authorization
- Developed [QR proxy](https://qr.hamropatro.com) server in NodeJs, (if you scan the qr from the Hamropatro app, this service will redirect it to particular route)

#### ETL 
- Wrote scripts for ETL of many service using [Celery Director](https://ovh.github.io/celery-director/)
- Migrated ETL of many service from Celery Director to [Apache Airflow](https://airflow.apache.org/)

#### OTHER
- Refactor golang code of bus route client which sends location [lat/long], added code to handle if there is network issue
- Wrote [systemd service](https://systemd.io/) for bus route client to restart automatically after shutdown
- Wrote script to fetch data from [elasticsearch](https://www.elastic.co/) for Machine Learning
- Wrote gRPC backend using TDD for sending hamro patro news user information using Micronaut

Thank you !!!