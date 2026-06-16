import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialVisualComponent } from './historial-visual.component';

describe('HistorialVisualComponent', () => {
  let component: HistorialVisualComponent;
  let fixture: ComponentFixture<HistorialVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistorialVisualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
