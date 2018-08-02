import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrattipusTorlesComponent } from './irattipus-torles.component';

describe('IrattipusTorlesComponent', () => {
  let component: IrattipusTorlesComponent;
  let fixture: ComponentFixture<IrattipusTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrattipusTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrattipusTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
