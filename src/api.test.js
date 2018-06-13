import path from 'path';
import { Pact, Matchers } from '@pact-foundation/pact';

import * as api from './api';

describe('api', () => {
  let provider;

  beforeAll(async () => {
  // beforeEach(async () => {
    provider = new Pact({
      dir: path.resolve(process.cwd(), 'pacts'),
      log: path.resolve(process.cwd(), 'pacts', 'log', 'mockserver-integration.log'),
      logLevel: 'error',
      spec: 2,
      consumer: 'my-consumer',
      provider: 'my-provider',
      pactfileWriteMode: 'merge',
      port: 3003,
    });

    await provider.setup();
  });

  afterAll(async () => {
  // afterEach(async () => {
    await provider.finalize();
  });

  it('retrieves users', async () => {
    provider.addInteraction({
      uponReceiving: 'a users request',
      withRequest: {
        method: 'GET',
        path: '/api/v1/users',
        headers: {
          Accept: 'application/json',
        },
      },
      willRespondWith: {
        status: 200,
        headers: {
          'Content-Type': Matchers.regex({
            generate: 'application/json; charset=utf-8',
            matcher: 'application\/json',
          }),
          // 'Content-Type': 'application/json',
        },
        body: Matchers.somethingLike({
          users: [{
            id: 1,
            name: 'John',
          }],
        }),
      },
    });

    const users = await api.getUsers();

    expect(users).toEqual([{
      id: 1,
      name: 'John',
    }]);

    await provider.verify();
  });
});
