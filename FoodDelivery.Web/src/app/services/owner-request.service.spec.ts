import { TestBed } from '@angular/core/testing';

import { OwnerRequestService } from './owner-request.service';

describe('OwnerRequestService', () => {
  let service: OwnerRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OwnerRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
