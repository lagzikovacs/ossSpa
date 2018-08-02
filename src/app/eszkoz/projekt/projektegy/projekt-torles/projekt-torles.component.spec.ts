import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektTorlesComponent } from './projekt-torles.component';

describe('ProjektTorlesComponent', () => {
  let component: ProjektTorlesComponent;
  let fixture: ComponentFixture<ProjektTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
