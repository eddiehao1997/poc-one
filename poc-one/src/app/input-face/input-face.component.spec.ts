import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFaceComponent } from './input-face.component';

describe('InputFaceComponent', () => {
  let component: InputFaceComponent;
  let fixture: ComponentFixture<InputFaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InputFaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
