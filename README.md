# nginx

macOS 上 nginx 的配置文件位置：/opt/homebrew/etc/nginx/nginx.conf，nginx 的安装方法：brew install nginx，安装成功后命令位于：brew install nginx 。

centOS 上安装 nginx：yum install nginx，配置文件路径：/etc/nginx/nginx.conf，命令文件路径：/usr/sbin/nginx 。

管理 nginx ：

```shell
sudo nginx -t # 测试配置文件是否正确
sudo nginx -s quit
sudo nginx -s stop
sudo nginx -s reload
sudo nginx -s reopen
```

检查是否起来了，以下三个都可以：

```shell
netstat -anp tcp | grep LISTEN
lsof -i -P -n | grep LISTEN
ss -an | grep LISTEN
```

# 在 nginx 上跑 Vue 项目

* 构建版本

```shell
npm run build
```

* 配置 nginx

```nginx
server {
    listen 127.0.0.1:80;
    server_name yourdomain.com; # 替换为你的域名
    
    # 配置Vue项目的静态文件服务
    location / {
        root /var/www/vue-app/dist;
        try_files $uri $uri/ /index.html;
    }
    
    # 配置 API 请求的代理
    location /api/ {
        proxy_pass https://backend-service:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

nginx 配置允许 cors：

```nginx
server {
    listen 127.0.0.1:80;
    server_name localhost; # 替换为你的域名
    
    # 配置 Vue 项目的静态文件服务（npm run build 后生成 dist 目录）
    location / {
        root  /Users/yijian/gadget-crafted-web/dist;
        index index.html index.htm;
    }

    # 配置 API 请求的代理
    location /api/ {
        proxy_pass http://127.0.0.1:2024;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
    
    # 允许所有来源的 CORS 请求（生产环境中应限制为特定来源）
    add_header 'Access-Control-Allow-Origin' '*' always;
    
    # 允许特定的 HTTP 方法
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE' always;
    
    # 允许特定的请求头
    add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept, Authorization' always;
    
    # 预检请求缓存时间（单位：秒）
    add_header 'Access-Control-Max-Age' 1728000 always;
    
    # 对于预检请求（OPTIONS 请求），直接返回 204 No Content
    if ($request_method = 'OPTIONS') {
        add_header 'Access-Control-Allow-Origin' '*';
        add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS, PUT, DELETE';
        add_header 'Access-Control-Allow-Headers' 'Origin, X-Requested-With, Content-Type, Accept, Authorization';
        add_header 'Content-Length' 0;
        add_header 'Content-Type' 'text/plain charset=UTF-8';
        return 204;
    }

    # 其他 location 配置...
}
```

上述第一个 location / { ... } 块配置了 Vue 项目的静态文件服务，root 指令指定了静态文件的目录，try_files 指令确保了 Vue 路由的正确工作。
第二个 location /api/ { ... } 块配置了 API 请求的代理。所有以 /api/ 开头的请求都会被转发到后端服务 http://backend-service:3000 。

nginx 配置 https：

```nginx
server {
    listen 80;
    server_name yourdomain.com; # 替换为实际域名
    return 301 https://$host$request_uri; # 将HTTP请求重定向到HTTPS
}
server {
    listen 443 ssl;
    server_name yourdomain.com; # 替换为域名
    
    ssl_certificate /path/to/server.crt; # 替换为 SSL 证书路径
    ssl_certificate_key /path/to/server.key; # 替换为私钥路径
    
    # 其他配置...
}
```

可从 [Let's Encrypt](https://letsencrypt.org/) 获取免费的 SSL 证书。

# gadget-crafted-web

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```
