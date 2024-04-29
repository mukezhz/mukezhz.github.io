---
title: Hamro Chautari
description: "Chat with your friends, family and colleagues."
date: "June 08 2022"
demoURL: "https://chat.hamropatro.com"
repoURL: ""
tags:
  - meet
  - chat
  - hamropatro
---

<img src="/assets/hamropatro/hamropatro.svg" alt="hamro chautari" width="200" height="200">

[Hamro Chautari](https://chautari.hamropatro.com) is like google meet which lets us Live audio/video chat around the world.
It is developed using livekit which is opensource tool build using GOLANG which provide webrtc wrapper handling turn/stun server.
It provide:

- server SDK for NodeJS, Java,.Golang..
- client SDK for Android, Javasript, ReactJS, Flutter, Golang ...

We have used NodeJS(TS) for the backend because at the time of development for backend there was SDK of NodeJS and Golang only.
Company chose the backend because I was familiar to that language and we need to develop POC in a week.

Initially, I developed the POC using NodeJS for backend SDK and Javascript client SDK for frontend. Obviously it didn't have cool UI like now.
I had added the GNU image as the wallpaper if the user TURN OFF their camera which was cool :). On backend side, at first we chose mongoDB for room operation. Later we migrated to postgresDB using prisma (to use prisma I conviced my manager :D). There was room operation api and meeting management.

On POC, there was only video and audio call. Later, I developed the application using ReactJS and added chat using webRTC[it is also provided by the SDK]. Obviously UI was not cool again but it was far better than before since I have used the client sdk of ReactJS.

After frontend developer modified the code which I have writtend and developed cool UI like now.

I remember the first day of deployment of chautari, there was reporter and youtubers. I was confident on my code but there was an issue (typo xD).
There was live demo going on and I was redeloying the backend. Since, there was all seperate services and decoupled, and we have used K8s for deployment client won't get any differences. So, it went well.

After production of version 1, we added live streaming and recording feature. There was an issue while live streaming to youtube but it worked fine on facebook.

The use of chautari are:

- live audio/video chat on [Hamro Health](https://health.hamropatro.com) [Tele Health Application]
- live health webinar every saturday at 9am
- internal meeting of office
- since the server of chautari is at Nepal, it is faster than other meeting apps (you can test it if you don't trust me)

**Note:** Its not directly available at Hamropato App if you are searching there

Thank you !!!