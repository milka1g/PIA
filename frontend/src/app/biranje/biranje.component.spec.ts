import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BiranjeComponent } from './biranje.component';

describe('BiranjeComponent', () => {
  let component: BiranjeComponent;
  let fixture: ComponentFixture<BiranjeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BiranjeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BiranjeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
