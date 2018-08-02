import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrattipusComponent } from './irattipus.component';

describe('IrattipusComponent', () => {
  let component: IrattipusComponent;
  let fixture: ComponentFixture<IrattipusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrattipusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrattipusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
