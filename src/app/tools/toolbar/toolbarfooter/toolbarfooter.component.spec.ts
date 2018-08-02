import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarfooterComponent } from './toolbarfooter.component';

describe('ToolbarfooterComponent', () => {
  let component: ToolbarfooterComponent;
  let fixture: ComponentFixture<ToolbarfooterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ToolbarfooterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ToolbarfooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
