import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektSzerkesztesComponent } from './projekt-szerkesztes.component';

describe('ProjektSzerkesztesComponent', () => {
  let component: ProjektSzerkesztesComponent;
  let fixture: ComponentFixture<ProjektSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
