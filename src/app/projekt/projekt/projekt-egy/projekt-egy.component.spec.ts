import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektEgyComponent } from './projekt-egy.component';

describe('ProjektEgyComponent', () => {
  let component: ProjektEgyComponent;
  let fixture: ComponentFixture<ProjektEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
