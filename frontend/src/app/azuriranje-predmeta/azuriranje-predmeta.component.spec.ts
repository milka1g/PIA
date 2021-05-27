import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AzuriranjePredmetaComponent } from './azuriranje-predmeta.component';

describe('AzuriranjePredmetaComponent', () => {
  let component: AzuriranjePredmetaComponent;
  let fixture: ComponentFixture<AzuriranjePredmetaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AzuriranjePredmetaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AzuriranjePredmetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
