import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationModuleComponent } from './registration-module.component';

describe('RegistrationModuleComponent', () => {
  let component: RegistrationModuleComponent;
  let fixture: ComponentFixture<RegistrationModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrationModuleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
