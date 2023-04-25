const request = require('supertest');
const server = require('../server');
const Post = require('../db/models/PostModel');

describe('Post API', () => {
  let user;
  let token;

  beforeAll(async () => {
    // Create a new user and get an auth token for them
    const userResponse = await request(server)
      .post('http://localhost:3000/api/users/register')
      .send({
        firstName: 'Tomi',
        lastName: 'Tim',
        email: 'example@example5.com',
        password: 'password',
      });
    user = userResponse.body.user;

    const loginResponse = await request(server)
      .post('/api/users/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password',
      });
    token = loginResponse.body.token;
  });

  afterAll(async () => {
    await Post.deleteMany({});
  });

  describe('POST /api/posts', () => {
    it('should create a new post', async () => {
      const newPost = {
        title: 'My First Post',
        body: 'This is my first post on this website',
        image: 'www.www.com',
        perfumeName: 'Chanel No. 5',
      };

      const response = await request(server)
        .post('/api/posts')
        .send(newPost)
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      expect(response.body.title).toBe(newPost.title);
      expect(response.body.body).toBe(newPost.body);
      expect(response.body.image).toBe(newPost.image);
      expect(response.body.perfumeName).toBe(newPost.perfumeName);
      expect(response.body.postedBy).toBe(user.id);
      expect(response.body.likes).toEqual([]);
      expect(response.body.comments).toEqual([]);
    });
  });
});
