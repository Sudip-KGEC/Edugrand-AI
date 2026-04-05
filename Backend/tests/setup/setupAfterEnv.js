// global setup after env

afterEach(() => {
  jest.clearAllMocks();
});

// Optional: increase timeout for async ops
jest.setTimeout(15000);