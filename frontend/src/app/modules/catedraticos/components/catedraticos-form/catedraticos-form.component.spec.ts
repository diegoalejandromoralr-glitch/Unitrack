import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatedraticosFormComponent } from './catedraticos-form.component';

describe('CatedraticosFormComponent', () => {
  let component: CatedraticosFormComponent;
  let fixture: ComponentFixture<CatedraticosFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatedraticosFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatedraticosFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
