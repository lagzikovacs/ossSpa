import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgynokSzerkesztesComponent } from './ugynok-szerkesztes.component';

describe('UgynokSzerkesztesComponent', () => {
  let component: UgynokSzerkesztesComponent;
  let fixture: ComponentFixture<UgynokSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgynokSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgynokSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
