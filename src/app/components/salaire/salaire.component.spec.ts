import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalaireComponent } from './salaire.component';

describe('SalaireComponent', () => {
  let component: SalaireComponent;
  let fixture: ComponentFixture<SalaireComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalaireComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
