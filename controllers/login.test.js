/*
1. якщо вірний логін та пароль відповідь повина мати статус-код 200
2. якщо вірний логін та пароль у відповіді повинен повертатися токен
3. у відповіді повинен повертатися об'єкт user з 2 полями email и subscription з типом даних String
4. якщо невірний пароль викинути помилку
5. якщо невірний імейл викинути помилку


const next = express.


*/

const express = require('express');
const { login } = require('./');

describe('test login controller', () => {
  test('existed email and password - status 200', () => {
    const { request: req, responce: res, next } = express;
    req.body = {
      email: 'spiderman@mail.com',
      password: '123456',
    };
    login(req, res, next)
      .then(res => {
        expect(res.status).toBe(200);
      })
      .catch(err => console.log(err));
  });
});
