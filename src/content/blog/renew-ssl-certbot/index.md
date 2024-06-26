---
title: Renew SSL using Preferred-Challege DNS
description: |
  Renew the expired SSL certificate using certbot via preferred-challenge dns.
date: "October 10 2022"
tags:
  - SSL
  - K8s
  - DNS
image: "/assets/devops/lets_encrypt.svg"
---
<img src="/assets/devops/lets_encrypt.svg" width="300" height="200"/>

**Renew certificate once the certificate expires**

- There are multiple ways to generate certificate
  - standalone: if you want to generate certificate from the server where the app is hosted
  - preferred-challenges dns: if you want to generate certificate form other place than the actual server

**Since we would like to generate new certificate for k8s we have to generate certificate in our os rather than generating from pod**

#### Steps to follow to generate certificate:

- Using `preferred-challenges dns`

```
 $ sudo certbot certonly --manual --preferred-challenges dns -d "<your domain>"
```

- Once you enter the command in terminal it will generate the following:

```
Saving debug log to /var/log/letsencrypt/letsencrypt.log
Requesting a certificate for test-app.my-domain.com

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Please deploy a DNS TXT record under the name:

_acme-challenge.test-app.my-domain.com.                             <---- THIS IS THE NAME OF TXT

with the following value:

_Vw6hq8hfGfBmf5Z3v0zUD9Q1_eFOfM9VzGaDYSJhwc                         <---- THIS IS THE VALUE OF TXT

Admin Toolbox: https://toolbox.googleapps.com/apps/dig/#TXT/_acme-challenge.test-app.my-domain.com.
- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
Press Enter to Continue
```

- We need to add DNS in cloudflare with:
  - Type TXT
  - Name "[NAME OF TXT]" in our case `_acme-challenge.test-app.my-domain.com.`
  - Content "[VALUE OF TXT]" in our case `_Vw6hq8hfGfBmf5Z3v0zUD9Q1_eFOfM9VzGaDYSJhwc`
- Once you place the value in cloudflare to check from the [Admin Toolbox](https://toolbox.googleapps.com/apps/dig/#TXT/_acme-challenge.test-app.my-domain.com.)
- Once it shows the value of TXT in Admin Toolbox: Press enter and you will get:

```
Successfully received certificate.
Certificate is saved at: /etc/letsencrypt/live/test-app.my-domain.com/fullchain.pem
Key is saved at:         /etc/letsencrypt/live/test-app.my-domain.com/privkey.pem
This certificate expires on 2023-01-08.
These files will be updated when the certificate renews.

NEXT STEPS:
- This certificate will not be renewed automatically. Autorenewal of --manual certificates requires the use of an authentication hook script (--manual-auth-hook) but one was not provided. To renew this certificate, repeat this same certbot command before the certificate's expiry date.

- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
```

#### Renewing SSL for kubernetes

- Now we need root privilage to perform action so: `$ sudo su`
- Goto the directory where you certificate are generated:
  - Our private key is: `privkey.pem`
  - Our public key is: `fullchain.pem`
- In k8s's secret we have `tls.crt` and `tls.key`
- To obtain with base encoded and copy to clipboard:
  - `tls.crt` -> `$ cat fullchain.pem | base64 | xclip -sel clip`
  - paste the content to [secret.yml](./secret.yml) in tls.crt
  - `tls.key` -> `$ cat privkey.pem | base64 | xclip -sel clip`
  - paste the content to [secret.yml](./secret.yml) in tls.key
- Apply the [secret.yml](./secret.yml) and enjoy!!!

```
$ kubectl apply -f secret.yml
```

**secret.yml**

```yaml
apiVersion: v1
kind: Secret
metadata:
  name: <secret name>
  namespace: <namespace>
type: kubernetes.io/tls
data:
  tls.crt: >-
    LS0tLS1CRUdJTBZ0lTQkgvNk5DbkhJTG1XOXEydTgraUV2cGhaTUEwzRFFFQkN3VUEKTURJeEN6QUpCZ05WQkFZVES0t...LS0K
  tls.key: >-
    LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBbzJ0c1VPTTVoSlA0UmpNazBYTVBQ...tLQo=

```

**NOTE:** we need to have base64 encoded text in single line

---

#### Renewing SSL for web servers

- Now we need root privilage to perform action so: `$ sudo su`
- Goto the directory where you certificate are generated:
  - Our private key is: `privkey.pem`
  - Our public key is: `fullchain.pem`
- Add the file where your web server configuration is looking for private key and public key.

Thank you for reading!!!