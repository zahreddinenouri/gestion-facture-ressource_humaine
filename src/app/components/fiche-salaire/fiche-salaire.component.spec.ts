import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FicheSalaireComponent } from './fiche-salaire.component';

describe('FicheSalaireComponent', () => {
  let component: FicheSalaireComponent;
  let fixture: ComponentFixture<FicheSalaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FicheSalaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FicheSalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
