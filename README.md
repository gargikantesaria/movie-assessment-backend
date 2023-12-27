# basic-structure-backend

This project contains the basic app structure of Node.js with Express & typeORM.


# package.json

This file contains the different npm packages that will be used in project.

Please take note on keep update the version of npm package, which are already mentioned in this file. You can add/remove npm packages according to your use.


# structure

## entity :
The app contains the entity folder, which contains different entity files.
	
Each entity file contains fields of collection & it’s used to map database table to perform database operations.

## repositories :
The app contains the repositories folder, which contains different repository files.
	
For each entity it’s having one particular repository file, which contains methods to perform different operation with database.

## services :
The app contains the services folder, which contains different service file.

Each service file contains the methods which having the actual steps we wants to perform while it’s getting executed.

## controllers :
The app contains the controller folder, which contains different controller file.

Each controller file contains the method which makes request to the particular service file function & give the response or throw error if any.


# .env :
You need to create one enviornment (.env) file in root directory of your project. which should contains below properties. You can change value of it according to your need.

mentioned TYPEORM_CONNECTION & TYPEORM_PORT value is for mySQL database. if you are using MongoDB database then you need to change TYPEORM_CONNECTION = mongodb & it has default port TYPEORM_PORT = 27017


- ROOT_URL = localhost
- PORT = 3003
- NODE_ENV = Development

- TYPEORM_CONNECTION = mysql
- TYPEORM_HOST = 
- TYPEORM_USERNAME = 
- TYPEORM_PASSWORD = 
- TYPEORM_DATABASE = 
- TYPEORM_PORT = 3306
- TYPEORM_SYNCHRONIZE = false
- TYPEORM_LOGGING = false
- TYPEORM_ENTITIES = dist/entity/**.js


# integrate:
To integrate this project from git , first you need to clone project repository by following below command:

https://gitlab.com/devmakwana022/basic-structure-backend.git


# run project:
After integrating project successfully, to run it follow below steps:

1. run command : npm install
	- which is used to install necessary modules(packages) from package.json file, which we have used in this project.

2. run command : npm run start
	- which is used to actually runs the project.