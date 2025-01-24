export function createMock<T>(): jest.Mocked<T> {
  return new Proxy(
    {},
    {
      get: (_, prop) => jest.fn(),
    },
  ) as jest.Mocked<T>;
}
