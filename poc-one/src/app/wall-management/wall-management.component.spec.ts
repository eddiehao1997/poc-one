import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WallManagementComponent } from './wall-management.component';

describe('WallManagementComponent', () => {
  let component: WallManagementComponent;
  let fixture: ComponentFixture<WallManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WallManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WallManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
