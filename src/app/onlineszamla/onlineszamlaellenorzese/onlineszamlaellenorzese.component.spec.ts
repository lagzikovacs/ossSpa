import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineszamlaellenorzeseComponent } from './onlineszamlaellenorzese.component';

describe('OnlineszamlaellenorzeseComponent', () => {
  let component: OnlineszamlaellenorzeseComponent;
  let fixture: ComponentFixture<OnlineszamlaellenorzeseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineszamlaellenorzeseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineszamlaellenorzeseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
