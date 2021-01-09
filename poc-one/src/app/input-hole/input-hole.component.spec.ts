import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputHoleComponent } from './input-hole.component';

describe('InputHoleComponent', () => {
  let component: InputHoleComponent;
  let fixture: ComponentFixture<InputHoleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputHoleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputHoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
