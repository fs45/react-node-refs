### Install NodeJS

Official doc https://nodejs.org/en/download/package-manager/#enterprise-linux-and-fedora

```
$ sudo yum install -y gcc-c++ make git
$ curl --silent --location https://rpm.nodesource.com/setup_6.x | sudo -E bash -
$ sudo yum install nodejs -y
$ node --version
v6.10.3
```

### Deploy application

Clone application source code

```
$ sudo mkdir -p /src/app
$ sudo chown ec2-user. /src/app
$ cd /src/app && git clone https://github.com/venkatoddi/cloudDezk
$ cd /src/app/cloudDezk/policy_simulator
```

Install dependencies and build frontend page for app

```
$ npm install
$ npm run buildClient
```

Change configuration for init script if needed. Open the script and change value
of `APP_DIR` to be path of cloned source.

Deliver init script for the app
**NOTE**: only do this step on first deployment, next time you can use it as is

```
$ sudo cp init.sh /etc/init.d/policy-simulator
$ sudo chmod +x /etc/init.d/policy-simulator
```

Setup database configuration by editing file `config/production.json`

Start application

```
$ sudo service policy-simulator start
$ sudo chkconfig policy-simulator on #only need to do this on first deployment
```

Check if the app is listening on port 3000

```
$ netstat -nlpt | grep :3000
```

### Setup Nginx as reverse proxy

Install Nginx

```
$ sudo yum install nginx -y
```

Remove default virtual host:
```
$ sudo rm /etc/nginx/conf.d/virtual.conf
```

Setup Nginx configuration file:

```
$ sudo -s
# vim /etc/nginx/nginx.conf ## add below configuration
user nginx;
worker_processes auto;
error_log /var/log/nginx/error.log;
pid /var/run/nginx.pid;

include /usr/share/nginx/modules/*.conf;

events {
    worker_connections 1024;
}

http {
    log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
                      '$status $body_bytes_sent "$http_referer" '
                      '"$http_user_agent" "$http_x_forwarded_for"';

    access_log  /var/log/nginx/access.log  main;

    sendfile            on;
    tcp_nopush          on;
    tcp_nodelay         on;
    keepalive_timeout   65;
    types_hash_max_size 2048;

    include             /etc/nginx/mime.types;
    default_type        application/octet-stream;
    include /etc/nginx/conf.d/*.conf;
}
```

Setup virtual host configuration file for the app.
Change the value of `server_name` to actual domain.

```
# vim /etc/nginx/conf.d/policy-advisor.conf ## add below configuration
server {
        listen 80;
        server_name www.clouddezk.com default_server;
        access_log /var/log/nginx/node_access.log combined;
        error_log /var/log/nginx/node_error.log warn;
        
        location / {
                proxy_set_header X-Real-IP $remote_addr;
                proxy_set_header X-Forwarded-For $remote_addr;
                proxy_set_header X-Forwarded-Proto $scheme;
                proxy_set_header Host $http_host;
                proxy_set_header Origin "";
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection "upgrade";
                proxy_pass http://127.0.0.1:3000;
        }
}

```

Restart nginx

```
# service nginx restart
```

### Setup security group

The instance should have a sg rule to allow connections to port 80.
When port 80 is allowed, try to connect to the instance on browser to verify.



### Release process

Below steps define how to update source code for nodejs application.
This assumes you're already inside the running server

```
$ # stop application
$ sudo service policy-simulator stop
$ # pull latest code from github
$ cd /src/app/cloudDezk/policy_simulator
$ git pull
$ # build frontend page again
$ npm run buildClient
$ # edit db configuration if required in release notes
$ # start application back
$ sudo service policy-simulator start
$ # verify application is listening on port 3000
$ sudo netstat -nlpt | grep :3000
```
