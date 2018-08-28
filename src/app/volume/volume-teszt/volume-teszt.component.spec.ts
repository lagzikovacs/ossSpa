import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeTesztComponent } from './volume-teszt.component';

describe('VolumeTesztComponent', () => {
  let component: VolumeTesztComponent;
  let fixture: ComponentFixture<VolumeTesztComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeTesztComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeTesztComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
