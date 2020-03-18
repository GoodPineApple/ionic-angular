import { TestBed, async, inject } from '@angular/core/testing';

import { AdvAuthGuard } from './advAuth.guard';

describe('AdvAuthGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdvAuthGuard]
    });
  });

  it('should ...', inject([AdvAuthGuard], (guard: AdvAuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
