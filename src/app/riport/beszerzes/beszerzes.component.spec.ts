import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BeszerzesComponent } from './beszerzes.component';

describe('BeszerzesComponent', () => {
  let component: BeszerzesComponent;
  let fixture: ComponentFixture<BeszerzesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BeszerzesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BeszerzesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
