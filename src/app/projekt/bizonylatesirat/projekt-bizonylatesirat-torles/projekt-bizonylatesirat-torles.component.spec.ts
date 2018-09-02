import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektBizonylatesiratTorlesComponent } from './projekt-bizonylatesirat-torles.component';

describe('ProjektBizonylatesiratTorlesComponent', () => {
  let component: ProjektBizonylatesiratTorlesComponent;
  let fixture: ComponentFixture<ProjektBizonylatesiratTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektBizonylatesiratTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektBizonylatesiratTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
