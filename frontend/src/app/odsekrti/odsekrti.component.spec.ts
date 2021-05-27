import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsekrtiComponent } from './odsekrti.component';

describe('OdsekrtiComponent', () => {
  let component: OdsekrtiComponent;
  let fixture: ComponentFixture<OdsekrtiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdsekrtiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdsekrtiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
