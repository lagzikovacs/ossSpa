import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrattipusegyComponent } from './irattipusegy.component';

describe('IrattipusegyComponent', () => {
  let component: IrattipusegyComponent;
  let fixture: ComponentFixture<IrattipusegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrattipusegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrattipusegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
