import { Test, TestingModule } from '@nestjs/testing';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdminService],
    }).compile();

    service = module.get(AdminService);
  });

  it('should return complete path', () => {
    // Actions
    const actual = service.getVewPath('admin');

    //Assertions
    expect(actual).toBe('admin/views/admin');
  });
});
