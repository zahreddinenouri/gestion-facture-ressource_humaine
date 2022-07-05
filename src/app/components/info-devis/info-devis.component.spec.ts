import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoDevisComponent } from './info-devis.component';

describe('InfoDevisComponent', () => {
  let component: InfoDevisComponent;
  let fixture: ComponentFixture<InfoDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
