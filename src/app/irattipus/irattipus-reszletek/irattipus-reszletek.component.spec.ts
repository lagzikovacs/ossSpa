import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrattipusReszletekComponent } from './irattipus-reszletek.component';

describe('IrattipusReszletekComponent', () => {
  let component: IrattipusReszletekComponent;
  let fixture: ComponentFixture<IrattipusReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrattipusReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrattipusReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
