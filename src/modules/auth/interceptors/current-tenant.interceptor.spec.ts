import { CurrentTenantInterceptor } from './current-tenant.interceptor';

describe('CurrentTenantInterceptor', () => {
  it('should be defined', () => {
    expect(new CurrentTenantInterceptor()).toBeDefined();
  });
});
