import { TestBed } from '@angular/core/testing';

import { CatedraticosService } from './catedraticos.service';

describe('CatedraticosService', () => {
  let service: CatedraticosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CatedraticosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
