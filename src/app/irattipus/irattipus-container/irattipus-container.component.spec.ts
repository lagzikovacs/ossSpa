import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IrattipusContainerComponent } from './irattipus-container.component';

describe('IrattipusContainerComponent', () => {
  let component: IrattipusContainerComponent;
  let fixture: ComponentFixture<IrattipusContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IrattipusContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IrattipusContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
