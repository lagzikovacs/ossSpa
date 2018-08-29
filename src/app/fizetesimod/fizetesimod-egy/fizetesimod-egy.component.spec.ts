import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizetesimodEgyComponent } from './fizetesimod-egy.component';

describe('FizetesimodEgyComponent', () => {
  let component: FizetesimodEgyComponent;
  let fixture: ComponentFixture<FizetesimodEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizetesimodEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizetesimodEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
