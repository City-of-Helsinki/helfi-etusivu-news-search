import { server } from './test/test-utils';

// Mock Drupal.t for tests.
global.Drupal = {
  t: (str, args, options) => str,
};

beforeAll(() => {
  server.listen();
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
