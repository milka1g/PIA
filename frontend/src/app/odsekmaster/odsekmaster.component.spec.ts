import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdsekmasterComponent } from './odsekmaster.component';

describe('OdsekmasterComponent', () => {
  let component: OdsekmasterComponent;
  let fixture: ComponentFixture<OdsekmasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdsekmasterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdsekmasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
