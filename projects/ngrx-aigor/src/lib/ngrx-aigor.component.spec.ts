import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgrxAigorComponent } from './ngrx-aigor.component';

describe('NgrxAigorComponent', () => {
  let component: NgrxAigorComponent;
  let fixture: ComponentFixture<NgrxAigorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgrxAigorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgrxAigorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
