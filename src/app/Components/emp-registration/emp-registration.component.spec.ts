import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpRegistrationComponent } from './emp-registration.component';

describe('EmpRegistrationComponent', () => {
  let component: EmpRegistrationComponent;
  let fixture: ComponentFixture<EmpRegistrationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpRegistrationComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmpRegistrationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
