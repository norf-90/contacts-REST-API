const mongoose = require('mongoose');
const request = require('supertest');
const app = require('../../app');
const { User } = require('../../models/user');

const { DB_HOST_TEST, PORT } = process.env;

describe('test register route', () => {
  let server = null;

  beforeAll(async () => {
    server = app.listen(PORT);
    await mongoose.connect(DB_HOST_TEST);
  });

  afterAll(async () => {
    server.close();
    await mongoose.connection.close();
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  test('register with correct data', async () => {
    const registerData = {
      name: 'test user 1',
      email: 'test@mail.com',
      password: '123456',
      avatar: '../../public/avatars/hulk_1685545056582.jpeg',
    };

    const { statusCode, body } = await request(app).post('/api/users/register').send(registerData);

    expect(statusCode).toBe(201);
    expect(body[registerData.name].email).toBe(registerData.email);
    expect(body[registerData.name].subscription).toBe('starter');

    const user = await User.findOne({ email: registerData.email });
    expect(user.name).toBe(registerData.name);
    expect(user.subscription).toBe('starter');
    expect(!user.token).toBe(true);
    expect(!!user.password).toBe(true);
  });
});
