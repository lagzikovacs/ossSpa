import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgynokListComponent } from './ugynok-list.component';

describe('UgynokListComponent', () => {
  let component: UgynokListComponent;
  let fixture: ComponentFixture<UgynokListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgynokListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgynokListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
