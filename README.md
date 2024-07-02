<h1 align="center">Automatic Feed</h1>
<p align="center">Cloud Computing Team - Bangkit 2024 Capstone Project</p>

A-Feed is an innovative project designed to revolutionize freshwater fish farming in Indonesia through the use of advanced technology. It focuses on developing an automatic feeding solution that leverages IoT (Internet of Things) and machine learning to optimize fish cultivation processes

The project is being developed by a multidisciplinary team with expertise in machine learning, mobile development, and cloud computing. The team members come from various universities and are working together to bring this innovative solution to life.

By leveraging technology, A-Feed aims to transform traditional fish farming practices, making them more efficient, sustainable, and profitable for farmers in Indonesia

## Cloud Architecture
![CloudArchitecture](https://github.com/aanputra26/A-Feed-backend/blob/main/images/CLOUD%20ARCHITECTURE%20CAPSTONE%20(1).png)
<br>
> Base url of this service is: http://localhost:5000/

The service available:

- Authentications
  <pre>POST /register</pre>
  <pre>POST /login</pre>
  <pre>DELETE /logout</pre>


# Instructions
 
1. Clone this repository & Install all dependencies with
```bash
npm install
```
2. Make your already create the database
3. Run server:

```bash
npm run start
```


# Environment

In order to run this project, you need to configure the following environment variables:

```bash

PORT= {your server port}

# Database Configuration MySQL
DB_HOST= {define your db host}
DB_USER= {define your db username}
DB_PASS= {define your db password}
DB_NAME= {define your db name}

# JWT TOKEN
ACCESS_TOKEN_SECRET= {define your secret key}
REFRESH_TOKEN_SECRET= {define your refresh key}
```


### Dependency

* [Express](https://www.npmjs.com/package/express)
* [JsonwebtokenT](https://www.npmjs.com/package/jsonwebtoken)
* [Bcrypt](https://www.npmjs.com/package/bcrypt)
* [DotEnv](https://www.npmjs.com/package/dotenv)
* [Mysql2](https://www.npmjs.com/package/mysql2)
* [Cors](https://www.npmjs.com/package/cors)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Sequelize](https://www.npmjs.com/package/sequelize)
* [Cookie-parser](https://www.npmjs.com/package/cookie-parser)

# Pull Requests
We welcome and appreciate any pull requests to improve the TanamIn project. If you have a bug fix, enhancement, or new idea, please feel free to contact us.
