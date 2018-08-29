import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeSzerkesztesComponent } from './me-szerkesztes.component';

describe('MeSzerkesztesComponent', () => {
  let component: MeSzerkesztesComponent;
  let fixture: ComponentFixture<MeSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
