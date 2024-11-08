# Los_banbalines_backend_24-2
Proyecto Frontend 24-2

## Ejecución

```
yarn
yarn dev
```

## Koa
Koa es un framework web minimalista para Node.js
```
yarn add koa koa-logger koa-router
```

## Nodemon
Nodemon es una librería que monitorea cambios en archivos de un servidor para reiniciarlo automaticamente
```
yarn add nodemon --dev
```
y agregar script en package.json:
"scripts": {
 "dev": "nodemon src/index.js"
 }

## Sequelize
Sequelize es una biblioteca que le permite interactuar con varias bases de datos SQL utilizando JavaScript

Agregar dependencias de Sequelize y Postgres:
```
yarn add sequelize pg pg-hstore
```
Agregar dependencia dev Sequelize CLI:
```
yarn add sequelize-cli –dev
```
Carpetas base para Sequelize:
```
yarn sequelize-cli init
```

## Bycript

## Dotenv

## Jsonwebtoken

## Postgres
Postgres es una solución de base de datos relacional de código abierto 
```
1. Como inicializar psql
sudo service postgresql start
2. Como crear el usuario de postgres
sudo -i -u postgres
3. Como crear la base de datos
createdb demo_dev
4. Como crear la clave del usuario
createuser demo_user
5. Como conectarse a la base de datos
psql
alter user demo_user with encrypted password 'pwd';
grant all privileges on database demo_dev to demo_user;
alter user demo_user createdb;
exit 
```

## Entorno
Una vez creada la base de datos e inicializado psql, se debe crear un archivo `.env`

```
DB_USER=demo_user
DB_PASSWORD='pwd'
DB_NAME=demo_dev
DB_HOST=127.0.0.1
PORT=3000
```
