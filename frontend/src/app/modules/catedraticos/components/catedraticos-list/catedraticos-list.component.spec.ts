import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatedraticosListComponent } from './catedraticos-list.component';

describe('CatedraticosListComponent', () => {
  let component: CatedraticosListComponent;
  let fixture: ComponentFixture<CatedraticosListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatedraticosListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CatedraticosListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
