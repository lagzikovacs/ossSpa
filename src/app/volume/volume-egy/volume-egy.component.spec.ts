import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeEgyComponent } from './volume-egy.component';

describe('VolumeEgyComponent', () => {
  let component: VolumeEgyComponent;
  let fixture: ComponentFixture<VolumeEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
