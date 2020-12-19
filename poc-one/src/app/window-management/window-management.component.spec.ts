import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WindowManagementComponent } from './window-management.component';

describe('WindowManagementComponent', () => {
  let component: WindowManagementComponent;
  let fixture: ComponentFixture<WindowManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WindowManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WindowManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
