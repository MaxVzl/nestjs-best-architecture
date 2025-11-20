import { AuthTestGuard } from './auth-test.guard';

describe('AuthTestGuard', () => {
  it('should be defined', () => {
    expect(new AuthTestGuard()).toBeDefined();
  });
});
