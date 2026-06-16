import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PensumMapComponent } from './pensum-map.component';

describe('PensumMapComponent', () => {
  let component: PensumMapComponent;
  let fixture: ComponentFixture<PensumMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PensumMapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PensumMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
