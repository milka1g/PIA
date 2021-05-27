import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektiNaukaComponent } from './projekti-nauka.component';

describe('ProjektiNaukaComponent', () => {
  let component: ProjektiNaukaComponent;
  let fixture: ComponentFixture<ProjektiNaukaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProjektiNaukaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektiNaukaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
