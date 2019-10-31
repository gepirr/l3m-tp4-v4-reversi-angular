import { TestBed } from '@angular/core/testing';

import { IaService } from './ia.service';

describe('IaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: IaService = TestBed.get(IaService);
    expect(service).toBeTruthy();
  });
});
