import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylatFormaiellenorzesComponent } from './bizonylat-formaiellenorzes.component';

describe('BizonylatFormaiellenorzesComponent', () => {
  let component: BizonylatFormaiellenorzesComponent;
  let fixture: ComponentFixture<BizonylatFormaiellenorzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylatFormaiellenorzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylatFormaiellenorzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
