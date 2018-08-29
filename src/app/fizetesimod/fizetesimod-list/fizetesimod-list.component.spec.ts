import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizetesimodListComponent } from './fizetesimod-list.component';

describe('FizetesimodListComponent', () => {
  let component: FizetesimodListComponent;
  let fixture: ComponentFixture<FizetesimodListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizetesimodListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizetesimodListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
