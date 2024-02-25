import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllBookedServicesComponent } from './all-booked-services.component';

describe('AllBookedServicesComponent', () => {
  let component: AllBookedServicesComponent;
  let fixture: ComponentFixture<AllBookedServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllBookedServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllBookedServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
