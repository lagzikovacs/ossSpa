import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektBizonylatesiratLevalasztasComponent } from './projekt-bizonylatesirat-levalasztas.component';

describe('ProjektBizonylatesiratLevalasztasComponent', () => {
  let component: ProjektBizonylatesiratLevalasztasComponent;
  let fixture: ComponentFixture<ProjektBizonylatesiratLevalasztasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektBizonylatesiratLevalasztasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektBizonylatesiratLevalasztasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
