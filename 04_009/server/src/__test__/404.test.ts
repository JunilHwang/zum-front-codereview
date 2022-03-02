import App from '@/app';
import supertest from 'supertest';

const { app } = new App();
const request = supertest(app);

it('404', async () => {
  const res = await request.get('/api/hihihi');
  expect(res.status).toBe(404);
});
