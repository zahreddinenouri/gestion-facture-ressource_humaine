import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoFactureComponent } from './info-facture.component';

describe('InfoFactureComponent', () => {
  let component: InfoFactureComponent;
  let fixture: ComponentFixture<InfoFactureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoFactureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoFactureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
