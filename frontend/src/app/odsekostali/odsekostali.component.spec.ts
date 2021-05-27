import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsekostaliComponent } from './odsekostali.component';

describe('OdsekostaliComponent', () => {
  let component: OdsekostaliComponent;
  let fixture: ComponentFixture<OdsekostaliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdsekostaliComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdsekostaliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
