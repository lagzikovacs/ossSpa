import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FizetesimodSzerkesztesComponent } from './fizetesimod-szerkesztes.component';

describe('FizetesimodSzerkesztesComponent', () => {
  let component: FizetesimodSzerkesztesComponent;
  let fixture: ComponentFixture<FizetesimodSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FizetesimodSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FizetesimodSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
