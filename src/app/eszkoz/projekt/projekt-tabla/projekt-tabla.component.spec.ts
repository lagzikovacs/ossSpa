import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektTablaComponent } from './projekt-tabla.component';

describe('ProjektTablaComponent', () => {
  let component: ProjektTablaComponent;
  let fixture: ComponentFixture<ProjektTablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektTablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektTablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
