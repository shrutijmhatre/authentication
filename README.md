# authentication
A NestJS module that would allow a user to sign up and sign in, to the application with a ReactJS frontend.

* The project is structured as a monorepo with both frontend and backend being served on a single server in production mode.

  

The folder structure is as below

  apps/api - Backend server
  apps/client - Frontend client
  

* Install MongoDB and connect to local MongoDB instance with uri mongodb://localhost/nestjs

* Start the project in production mode with

```bash

npm start

```

**FE routes**
http://localhost:3000 - Welcome page
http://localhost:3000/login - Login page
http://localhost:3000/signup - Signup page

**BE APIs**
http://localhost:3000/api/users/signup - POST api to signup users
http://localhost:3000/api/users/login - POST api to login users
