🚀 Apache HTTP Server :

1. What is Apache HTTP Server?
Apache is an open-source web server that allows you to host websites and web applications. It handles HTTP requests and serves files like HTML, CSS, JS, images, etc.

2. Installation (Ubuntu/Debian)
sudo apt update
sudo apt install apache2

- Verify installation:
apache2 -v     # Shows Apache version

3. Starting, Stopping, and Checking Status
sudo systemctl start apache2        # Start Apache
sudo systemctl stop apache2         # Stop Apache
sudo systemctl restart apache2      # Restart Apache
sudo systemctl status apache2       # Check status

4. Accessing Apache Web Server
* Open browser and go to: `http://localhost` or your server IP.
* Default web page is served from:
  /var/www/html/index.html

5. Modify Web Content
cd /var/www/html
sudo nano index.html       # Edit homepage

You can replace this file with your own website files.

6. Important Apache Files and Directories

| File/Folder                     | Purpose                           |
| ------------------------------- | --------------------------------- |
| `/etc/apache2/apache2.conf`     | Main config file (Ubuntu)         |
| `/etc/apache2/sites-available/` | Virtual host files                |
| `/etc/apache2/sites-enabled/`   | Enabled sites (linked from above) |
| `/var/www/html/`                | Default web root                  |
| `/var/log/apache2/`             | Log files                         |

---

7. Hosting Multiple Sites (Virtual Hosts)

- Create a new file:
sudo nano /etc/apache2/sites-available/yourdomain.conf

Example config:

```apache
<VirtualHost *:80>
    ServerName yourdomain.com
    DocumentRoot /var/www/yourdomain
    ErrorLog ${APACHE_LOG_DIR}/error.log
    CustomLog ${APACHE_LOG_DIR}/access.log combined
</VirtualHost>
```

Then run:

```bash
sudo a2ensite yourdomain.conf
sudo systemctl reload apache2
```

8. Enable/Disable Modules :
sudo a2enmod rewrite       # Enable mod_rewrite
sudo a2dismod rewrite      # Disable mod_rewrite
sudo systemctl restart apache2

- List enabled modules:
apache2ctl -M

9. Firewall (Optional)**

- Allow traffic on HTTP (80) and HTTPS (443):
sudo ufw allow 'Apache Full'

- Check firewall status:
sudo ufw status

10. Verify Apache is Running
curl -I localhost

---

💡 Bonus Tips for DevOps:

* Use Apache with reverse proxy to connect it to backend apps (Node.js, Flask).
* Learn how to set up SSL (HTTPS) using Let’s Encrypt.
* Learn **log monitoring from `/var/log/apache2/access.log`.

---

🚀 Node.js :

Node.js is an open-source, cross-platform JavaScript runtime environment that runs JavaScript code outside the browser—mainly used to build fast, scalable server-side applications.

---

  Why DevOps Engineers Should Know Node.js

* Many modern backend apps (APIs, web servers, tools) are built using Node.js.
* As a DevOps engineer, you’ll often:

  * Deploy Node.js apps
  * Set up process managers (like PM2)
  * Monitor and log performance
  * Reverse proxy with Apache or Nginx
  * Automate CI/CD for Node-based projects

---

1. Install Node.js (Ubuntu/Debian)
sudo apt update
sudo apt install nodejs npm -y

Check versions:
```bash
node -v
npm -v
```

Optional (Install using Node Version Manager):
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.5/install.sh | bash
source ~/.bashrc
nvm install node      # Install latest

---

2. Basic Node.js App

Create a file `app.js`:

```js
const http = require('http');

const server = http.createServer((req, res) => {
  res.write('Hello from Node.js!');
  res.end();
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
```

Run:

```bash
node app.js
```

Test in browser:
`http://localhost:3000`

---

3. Useful Node.js Commands

npm init          # Initialize a project
npm install pkg   # Install a package
npm list          # Show installed packages
npm start         # Start the app (if defined in package.json)
---

4. Process Management with PM2 (Important for DevOps)

Install PM2 globally:
sudo npm install -g pm2

Start your app with PM2:

```bash
pm2 start app.js
pm2 list                  # Show all running apps
pm2 logs                  # Show logs
pm2 stop app              # Stop app
pm2 startup               # Generate startup script for reboot
pm2 save                  # Save running apps
```

---
5. Apache/NGINX Reverse Proxy (Common in DevOps)

Use Apache or NGINX to expose your Node app to the internet on port 80.

Example (for Apache virtual host):

```apache
ProxyPreserveHost On
ProxyPass / http://localhost:3000/
ProxyPassReverse / http://localhost:3000/
```

Enable required Apache modules:

```bash
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo systemctl restart apache2
```

---

6. Log Files and Monitoring

Log with:

```bash
console.log(), console.error()
```

Monitor using:

* PM2 logs
* Apache access/error logs
* Grafana (for monitoring)

---

In DevOps, you’ll connect Node.js apps with:

* Jenkins for pipeline deployment
* Docker to containerize the app
* GitHub Actions for CI/CD

