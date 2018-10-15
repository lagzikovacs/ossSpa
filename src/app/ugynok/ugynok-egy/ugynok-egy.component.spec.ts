import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeliratkozasEgyComponent } from './ugynok-egy.component';

describe('FeliratkozasEgyComponent', () => {
  let component: FeliratkozasEgyComponent;
  let fixture: ComponentFixture<FeliratkozasEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeliratkozasEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeliratkozasEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
