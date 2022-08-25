import { config, createSchema } from '@keystone-next/keystone/schema';
import 'dotenv/config';

const dataBaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/keystone';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long they stay logged in
  secret: process.env.COOKIE_SECRET,
};

export default config({
  server: {
    cors: {
      origin: [process.env.FRONTEND_URL],
      credentials: true,
    },
  },
  db: {
    adapter: 'mongoose',
    url: dataBaseUrl,
    // TODO: Add data sending here
  },
  lists: createSchema({
    // Schema items go in here
  }),
  ui: {
    // TODO: change this for rules
    isAccessAllowed: () => true,
  },
  // TODO: add session values here
});
