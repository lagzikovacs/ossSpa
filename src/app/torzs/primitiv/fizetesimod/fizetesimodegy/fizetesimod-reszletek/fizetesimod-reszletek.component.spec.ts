import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizetesimodReszletekComponent } from './fizetesimod-reszletek.component';

describe('FizetesimodReszletekComponent', () => {
  let component: FizetesimodReszletekComponent;
  let fixture: ComponentFixture<FizetesimodReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizetesimodReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizetesimodReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
