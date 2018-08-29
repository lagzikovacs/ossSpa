import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrattipusEgyComponent } from './irattipus-egy.component';

describe('IrattipusEgyComponent', () => {
  let component: IrattipusEgyComponent;
  let fixture: ComponentFixture<IrattipusEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrattipusEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrattipusEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
