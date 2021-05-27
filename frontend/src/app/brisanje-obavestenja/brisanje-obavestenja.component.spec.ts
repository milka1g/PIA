import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrisanjeObavestenjaComponent } from './brisanje-obavestenja.component';

describe('BrisanjeObavestenjaComponent', () => {
  let component: BrisanjeObavestenjaComponent;
  let fixture: ComponentFixture<BrisanjeObavestenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrisanjeObavestenjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrisanjeObavestenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
