import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrattipusListComponent } from './irattipus-list.component';

describe('IrattipusListComponent', () => {
  let component: IrattipusListComponent;
  let fixture: ComponentFixture<IrattipusListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrattipusListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrattipusListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
