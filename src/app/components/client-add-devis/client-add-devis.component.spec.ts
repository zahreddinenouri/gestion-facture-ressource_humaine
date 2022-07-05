import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientAddDevisComponent } from './client-add-devis.component';

describe('ClientAddDevisComponent', () => {
  let component: ClientAddDevisComponent;
  let fixture: ComponentFixture<ClientAddDevisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientAddDevisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientAddDevisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
