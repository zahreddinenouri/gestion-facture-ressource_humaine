import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoClientDevisComponent } from './info-client-devis.component';

describe('InfoClientDevisComponent', () => {
  let component: InfoClientDevisComponent;
  let fixture: ComponentFixture<InfoClientDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfoClientDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoClientDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
