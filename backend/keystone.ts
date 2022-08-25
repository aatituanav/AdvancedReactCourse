import { config, createSchema } from '@keystone-next/keystone/schema';
import { createAuth } from '@keystone-next/auth';
import {
  withItemData,
  statelessSessions,
} from '@keystone-next/keystone/session';
import { User } from './schemas/User';
import { Product } from './schemas/Product';
import { ProductImage } from './schemas/ProductImage';

import 'dotenv/config';

const dataBaseUrl = process.env.DATABASE_URL || 'mongodb://localhost/keystone';

const sessionConfig = {
  maxAge: 60 * 60 * 24 * 360, // how long they stay logged in
  secret: process.env.COOKIE_SECRET,
};

const { withAuth } = createAuth({
  listKey: 'User',
  identityField: 'email',
  secretField: 'password',
  initFirstItem: {
    fields: ['name', 'email', 'password'],
  },
});

export default withAuth(
  config({
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
      User,
      Product,
      ProductImage,
    }),
    ui: {
      // show the ui only for people who pass this test
      isAccessAllowed: ({ session }) => {
        console.log(session);
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
        return session?.data;
      },
    },
    // TODO: add session values here
    session: withItemData(statelessSessions(sessionConfig), {
      User: 'id',
    }),
  })
);
