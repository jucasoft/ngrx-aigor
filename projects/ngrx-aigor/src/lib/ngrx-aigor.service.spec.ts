import { TestBed } from '@angular/core/testing';

import { NgrxAigorService } from './ngrx-aigor.service';

describe('NgrxAigorService', () => {
  let service: NgrxAigorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgrxAigorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
