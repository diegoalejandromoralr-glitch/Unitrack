import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkedListVisualComponent } from './linked-list-visual.component';

describe('LinkedListVisualComponent', () => {
  let component: LinkedListVisualComponent;
  let fixture: ComponentFixture<LinkedListVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkedListVisualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinkedListVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
