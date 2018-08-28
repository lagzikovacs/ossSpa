import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VolumeContainerComponent } from './volume-container.component';

describe('VolumeContainerComponent', () => {
  let component: VolumeContainerComponent;
  let fixture: ComponentFixture<VolumeContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VolumeContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VolumeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
