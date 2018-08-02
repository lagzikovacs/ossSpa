import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektNapelemComponent } from './projekt-napelem.component';

describe('ProjektNapelemComponent', () => {
  let component: ProjektNapelemComponent;
  let fixture: ComponentFixture<ProjektNapelemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektNapelemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektNapelemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
