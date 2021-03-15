# nodejs-webapi-demo

A demo project for Node.js Express web api server

## Tech

* Built with Node.js version 14.15.0 and **Express version 4.17.1**
* TypeORM version 0.2.31 for database connection and object-relational mapping
* Pg version 8.5.1 for PostgreSQL
* Express-validator version 6.10.0 for api request validation
* Dotenv version 8.2.0 for loading different environment variables into the config
* Typescript version 4.1.5
* Update database schema with TypeORM cli migration
* MVC structure with controllers, services and dto

## What's next

* User authentication and password encryption 
* JSON Web Token (JWT)
* Best practice

## How to run

* Check syntax error: ```npm run lint```
* Run in dev: ```npm run start:dev```
* Build in prod: ```node build.js```
* Run in prod: ```npm start```
* Generate migration: ```npm run typeorm:cli -- migration:generate -n CreateMyTable```
* Run migration: ```npm run typeorm:cli -- migration:run```
* Revert migration: ```npm run typeorm:cli -- migration:revert```

## Tutorials that I followed

* https://www.velotio.com/engineering-blog/set-up-production-ready-rest-nodejs-api-server-using-typescript-express-postgresq
* https://medium.com/swlh/how-to-rest-api-a-tale-of-node-js-express-and-typescript-77bc598b280c
* https://wanago.io/2018/12/03/typescript-express-tutorial-routing-controllers-middleware/