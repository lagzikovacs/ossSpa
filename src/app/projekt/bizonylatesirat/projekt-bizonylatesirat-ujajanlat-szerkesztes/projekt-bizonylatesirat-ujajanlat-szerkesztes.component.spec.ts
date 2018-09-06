import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektBizonylatesiratUjajanlatSzerkesztesComponent } from './projekt-bizonylatesirat-ujajanlat-szerkesztes.component';

describe('ProjektBizonylatesiratUjajanlatSzerkesztesComponent', () => {
  let component: ProjektBizonylatesiratUjajanlatSzerkesztesComponent;
  let fixture: ComponentFixture<ProjektBizonylatesiratUjajanlatSzerkesztesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektBizonylatesiratUjajanlatSzerkesztesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektBizonylatesiratUjajanlatSzerkesztesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
