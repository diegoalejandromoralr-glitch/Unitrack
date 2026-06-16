import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensumFormComponent } from './pensum-form.component';

describe('PensumFormComponent', () => {
  let component: PensumFormComponent;
  let fixture: ComponentFixture<PensumFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PensumFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PensumFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
