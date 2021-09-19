import { executeGraphQL } from './index';

describe('Hello world', () => {
  test('hello query should return world', async () => {
    const query = `query {
      hello
    }
    `;
    const result = await executeGraphQL(query);
    expect(result?.data?.hello).toBe('world');
  });
});
