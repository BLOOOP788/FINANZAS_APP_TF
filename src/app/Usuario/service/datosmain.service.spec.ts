import { TestBed } from '@angular/core/testing';

import { DatosmainService } from './datosmain.service';

describe('DatosmainService', () => {
  let service: DatosmainService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatosmainService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
