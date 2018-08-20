import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeReszletekComponent } from './volume-reszletek.component';

describe('VolumeReszletekComponent', () => {
  let component: VolumeReszletekComponent;
  let fixture: ComponentFixture<VolumeReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
