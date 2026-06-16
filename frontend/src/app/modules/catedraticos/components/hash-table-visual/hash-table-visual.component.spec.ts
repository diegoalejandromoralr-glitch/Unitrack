import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HashTableVisualComponent } from './hash-table-visual.component';

describe('HashTableVisualComponent', () => {
  let component: HashTableVisualComponent;
  let fixture: ComponentFixture<HashTableVisualComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HashTableVisualComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HashTableVisualComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
