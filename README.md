## Haaukins participant frontend
The Haaukins participant frontend is used by students to access labs on Haaukins 2.0. The source code is located at:
[https://github.com/aau-network-security/haaukins-frontend.git](https://github.com/aau-network-security/haaukins-frontend.git)
To setup the participant frontend a config will have to be added to the NGINX config.   
1. Add NGINX configs to nginx sites available and link to sites enabled. 
2. Make sure the correct domain name is used in `/src/api/client.js` i.e: 

```javascript
import axios from "axios";

export const BASE_URL = "https://beta.haaukins.com/v1/event/"

const apiClient = axios.create({
  
  baseURL: "https://beta.haaukins.com/v1/event"
});

export default apiClient;
```
4. Build and start the frontend with the following command: `npm build`  

The nginx proxy for the frontend server looks like the following: 
```conf
upstream frontend_server {
  keepalive 100;
  keepalive_requests 1000;
  keepalive_timeout 60s;
  server localhost:3000;
}

server {
  #server_name ~^(?<event>\w+)\.a\.haaukins\.com$;
  server_name *.beta.domainname.com;
  #limit_req zone=mylimit burst=15;
  #Set limit to 10 after test
  #limit_conn addr 500;
  #limit_req_status 429;
  client_max_body_size 100M;
  location / {
    proxy_pass http://frontend_server;
    proxy_buffering off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }


  listen 443 ssl; # managed by Certbot
  ssl_certificate /home/haaukins/daemon/certs/fullchain.pem; # managed by Certbot
  ssl_certificate_key /home/haaukins/daemon/certs/privkey.pem; # managed by Certbot
}

#Uncomment if ssl is used
server {
  server_name *.beta.domainname.com;
  listen 80;
  return 301 https://$host$request_uri;
}
```

and for GRPC the NGINX config is: 
```conf
upstream dev {
 server localhost:8081;
}
server {
  listen 5454 http2 ssl;
  ssl_certificate /home/haaukins/daemon/certs/fullchain.pem;  #Enter you certificate location
  ssl_certificate_key /home/haaukins/daemon/certs/privkey.pem;
  client_max_body_size 100M;
  location / {
    grpc_pass grpc://dev;

  }
}
```

The NGINX config for guacamole looks like the following: 
```conf
upstream haaukins_server {
  keepalive 100;
  keepalive_requests 1000;
  keepalive_timeout 60s;
  server localhost:8082;
}

server {
  #server_name ~^(?<event>\w+)\.a\.haaukins\.com$;
  server_name *.dev01.haaukins.com;
  # limit_req zone=mylimit burst=15;
  #Set limit to 10 after test
  #limit_conn addr 500;
  #limit_req_status 429;
  client_max_body_size 100M;
  location / {
    proxy_pass http://haaukins_server;
    proxy_buffering off;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection 'upgrade';
    proxy_set_header Host $host;
    proxy_cache_bypass $http_upgrade;
  }


  listen 443 ssl; # managed by Certbot
  ssl_certificate /home/haaukins/daemon/certs/fullchain.pem; # managed by Certbot
  ssl_certificate_key /home/haaukins/daemon/certs/privkey.pem; # managed by Certbot
}

#Uncomment if ssl is used
server {
  server_name *.dev02.haaukins.com;
  listen 80;
  return 301 https://$host$request_uri;
}
```
