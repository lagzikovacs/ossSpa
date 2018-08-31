import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektBizonylatesiratUjajanlatComponent } from './projekt-bizonylatesirat-ujajanlat.component';

describe('ProjektBizonylatesiratUjajanlatComponent', () => {
  let component: ProjektBizonylatesiratUjajanlatComponent;
  let fixture: ComponentFixture<ProjektBizonylatesiratUjajanlatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektBizonylatesiratUjajanlatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektBizonylatesiratUjajanlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
