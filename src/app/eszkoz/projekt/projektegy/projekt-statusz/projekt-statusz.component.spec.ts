import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektStatuszComponent } from './projekt-statusz.component';

describe('ProjektStatuszComponent', () => {
  let component: ProjektStatuszComponent;
  let fixture: ComponentFixture<ProjektStatuszComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektStatuszComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektStatuszComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
