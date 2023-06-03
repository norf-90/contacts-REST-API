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
const mongoose = require('mongoose');

// const app = express();

describe('test login controller', () => {
  afterAll(async () => {
    // Closing the DB connection allows Jest to exit successfully.
    await mongoose.connection.close();
  });

  test('existed email and password - status 200', () => {
    const req = express.request;
    const res = express.response;
    const next = jest.fn(); // Create a mock function for 'next'
    req.body = {
      email: 'spiderman@mail.com',
      password: '123456',
    };

    // eslint-disable-next-line jest/valid-expect-in-promise
    login(req, res, next).then(res => {
      expect(res.status).toBe(200);
      expect(next).not.toHaveBeenCalled();
    });
  });
});
