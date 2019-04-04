# Whuz Cooking

# Description

- Enter meals and ingredients
- add ingredients to a shopping list

# Prerequisites

- Your favorite code editor...such as [Visual Studio Code](https://code.visualstudio.com/)
- Latest version [node.js](https://nodejs.org/en/)
- Latest version [MySQL Community Server](https://dev.mysql.com/downloads/) MySQL Workbench is also recommended, and installs from the web

## Dependencies

[Dotenv](https://www.npmjs.com/package/dotenv) zero-dependency module that loads environment variables

[Express](https://www.npmjs.com/package/express) Fast, unopinionated, minimalist web framework for node.

[Express-Handlebars](https://www.npmjs.com/package/express-handlebars) A Handlebars view engine for Express which doesn't suck.

[MySQL2](https://www.npmjs.com/package/mysql2) MySQL client for Node.js with focus on performance.

[Sequelize](https://www.npmjs.com/package/sequelize) Sequelize is a promise-based Node.js ORM for Postgres, MySQL, MariaDB, SQLite and Microsoft SQL Server.



# Getting Started

### Clone the Repository
> git clone https://this-repository

### Install dependencies
  > npm install

### Configure Environment Variables
Create a new file in the root directory named .env

Add the code below to the .env file, save, and close
```
    PSWD = <your password>
```
Open MySQL Workbench to the local instance created during installation

Click add SQL ![alt](https://github.com/michaeldcastillo/group-project-2/blob/master/demo/add-sql.PNG)

Copy the contents of seed.sql to the SQL editor in Workbench

Click the Execute button ![alt](https://github.com/michaeldcastillo/group-project-2/blob/master/demo/run.PNG)

You should see a message that indicates your action was successful ![alt](https://github.com/michaeldcastillo/group-project-2/blob/master/demo/success.PNG)

Your root directory should look like this

```
    ./whuz-cooking
        ./config
            config.json
        ./db
            schema.sql
        ./models
            example.js
            index.js
        ./node_modules
        ./public
            ./css
            ./demo
            ./js
        ./routes
            api.js
            html.js
        ./test
        ./views
            ./layouts
                main.handlebars
            404.handlebars
            example.handlebars
            index.handlebars
        .env
        .eslintignore
        .eslintrc.json
        .gitignore
        .travis.yml
        package-lock.json
        package.json
```

# How to Use