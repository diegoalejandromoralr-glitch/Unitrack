import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvlTreeVisualComponent } from './avl-tree-visual.component';

describe('AvlTreeVisualComponent', () => {
  let component: AvlTreeVisualComponent;
  let fixture: ComponentFixture<AvlTreeVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AvlTreeVisualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AvlTreeVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
