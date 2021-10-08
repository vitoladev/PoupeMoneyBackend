import { executeGraphQL } from './helpers';

describe('Hello world', () => {
  test('hello query should return world', async () => {
    const query = `query {
      hello
    }
    `;
    const result = await executeGraphQL(query);
    expect(result?.data?.hello).toBe('Hello World!');
  });
});
