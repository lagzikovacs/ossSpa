import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeegyComponent } from './volumeegy.component';

describe('VolumeegyComponent', () => {
  let component: VolumeegyComponent;
  let fixture: ComponentFixture<VolumeegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
