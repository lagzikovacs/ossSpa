import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgynokReszletekComponent } from './ugynok-reszletek.component';

describe('UgynokReszletekComponent', () => {
  let component: UgynokReszletekComponent;
  let fixture: ComponentFixture<UgynokReszletekComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgynokReszletekComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgynokReszletekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
