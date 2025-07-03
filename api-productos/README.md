PROYECTO PERSONAL CRUD DE PRODUCTOS EN NODE.JS BACKEND APIREST JWT - EXPRESS - SEQUELIZE

Ejecutar servidor:   node index.js

Registrar usuarios

POST http://localhost:3000/api/auth/register
Body JSON:
{
  "nombre": "Juan",
  "email": "juan@mail.com",
  "password": "123456"
}


Login

POST http://localhost:3000/api/auth/login
Body JSON:
{
  "email": "juan@mail.com",
  "password": "123456"
}


Consultar productos

GET http://localhost:3000/api/productos
Headers:
Authorization: Bearer <token>
