import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjeObavestenjaComponent } from './azuriranje-obavestenja.component';

describe('AzuriranjeObavestenjaComponent', () => {
  let component: AzuriranjeObavestenjaComponent;
  let fixture: ComponentFixture<AzuriranjeObavestenjaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzuriranjeObavestenjaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzuriranjeObavestenjaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
