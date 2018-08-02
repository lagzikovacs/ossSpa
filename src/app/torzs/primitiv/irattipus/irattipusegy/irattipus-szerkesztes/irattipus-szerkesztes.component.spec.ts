import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrattipusSzerkesztesComponent } from './irattipus-szerkesztes.component';

describe('IrattipusSzerkesztesComponent', () => {
  let component: IrattipusSzerkesztesComponent;
  let fixture: ComponentFixture<IrattipusSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrattipusSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrattipusSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
