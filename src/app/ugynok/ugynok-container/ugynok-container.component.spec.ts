import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgynokContainerComponent } from './ugynok-container.component';

describe('UgynokContainerComponent', () => {
  let component: UgynokContainerComponent;
  let fixture: ComponentFixture<UgynokContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgynokContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgynokContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
