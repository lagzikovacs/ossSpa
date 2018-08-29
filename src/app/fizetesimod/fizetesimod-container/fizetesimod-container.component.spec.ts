import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizetesimodContainerComponent } from './fizetesimod-container.component';

describe('FizetesimodContainerComponent', () => {
  let component: FizetesimodContainerComponent;
  let fixture: ComponentFixture<FizetesimodContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizetesimodContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizetesimodContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
