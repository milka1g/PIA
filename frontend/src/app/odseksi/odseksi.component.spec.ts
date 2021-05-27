import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OdseksiComponent } from './odseksi.component';

describe('OdseksiComponent', () => {
  let component: OdseksiComponent;
  let fixture: ComponentFixture<OdseksiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OdseksiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OdseksiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
