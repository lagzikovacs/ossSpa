import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AjanlatkeresSzerkesztesComponent } from './ajanlatkeres-szerkesztes.component';

describe('AjanlatkeresSzerkesztesComponent', () => {
  let component: AjanlatkeresSzerkesztesComponent;
  let fixture: ComponentFixture<AjanlatkeresSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjanlatkeresSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AjanlatkeresSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
