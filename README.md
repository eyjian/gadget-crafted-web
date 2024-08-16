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

# 申请免费证书

* 安装 Certbot

**基于 Debian 的系统（如 Ubuntu）**

```shell
sudo apt update
sudo apt install certbot python3-certbot-nginx # 对于Nginx服务器
# 或者
sudo apt install certbot python3-certbot-apache # 对于Apache服务器
```

**基于 RPM 的系统（如 CentOS/RHEL）**

```shell
sudo yum install epel-release
sudo yum install certbot python3-certbot-nginx # 对于Nginx服务器
# 或者
sudo yum install certbot python3-certbot-apache # 对于Apache服务器
```

**使用 DNF 的系统（如 Fedora）**

```shell
sudo dnf install certbot python3-certbot-nginx # 对于Ngin下服务器
# 或者
sudo dnf install certbot python3-certbot-apache # 对于Apache服务器
```

* 获取并安装证书

```shell
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
# 或者
sudo certbot --apache -d yourdomain.com -d www.yourdomain.com
```

yourdomain.com 和 www.yourdomain.com 需要替换为实际的域名，比如：hwten.cn 。

* 验证所有权

```
Certbot 将会通过访问在域名上配置的特定路径来验证对域名的所有权，可能需要按照 Certbot 的提示创建一个文件或修改 DNS 记录。
```

* 完成安装

一旦所有权验证成功，Certbot 将会下载并安装 SSL 证书，并自动更新 Web 服务器配置。

* 测试证书

打开浏览器，访问域名，确保它现在使用 HTTPS 并提供安全的连接。

* 设置自动更新

Let's Encrypt 证书有效期为 90 天，因此建议设置自动更新，Certbot 可以在证书即将过期时自动更新它们。

```shell
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

如果没有使用systemd，可以使用以下命令：

```shell
sudo crontab -e
```

然后添加以下行来设置定时任务（每天检查一次）：

```
0 0 * * * /usr/bin/certbot renew --quiet
```

请注意，自动更新过程不会中断正在运行的服务，但可能会短暂影响性能，确保在生产环境中测试自动更新过程。

# 安全配置 nginx

```shell
sudo chown -R root:root /etc/nginx
sudo chmod -R 750 /etc/nginx
sudo chmod 640 /etc/nginx/conf.d/*
```

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
