import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizetesimodComponent } from './fizetesimod.component';

describe('FizetesimodComponent', () => {
  let component: FizetesimodComponent;
  let fixture: ComponentFixture<FizetesimodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizetesimodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizetesimodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
