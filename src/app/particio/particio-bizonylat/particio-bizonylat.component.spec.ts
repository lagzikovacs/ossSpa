import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticioBizonylatComponent } from './particio-bizonylat.component';

describe('ParticioBizonylatComponent', () => {
  let component: ParticioBizonylatComponent;
  let fixture: ComponentFixture<ParticioBizonylatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticioBizonylatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticioBizonylatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
