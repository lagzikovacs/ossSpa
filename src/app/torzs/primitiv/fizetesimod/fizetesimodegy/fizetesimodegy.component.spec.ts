import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizetesimodegyComponent } from './fizetesimodegy.component';

describe('FizetesimodegyComponent', () => {
  let component: FizetesimodegyComponent;
  let fixture: ComponentFixture<FizetesimodegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizetesimodegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizetesimodegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
