import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CikkBeszerzesKivetComponent } from './cikk-beszerzes-kivet.component';

describe('CikkBeszerzesKivetComponent', () => {
  let component: CikkBeszerzesKivetComponent;
  let fixture: ComponentFixture<CikkBeszerzesKivetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CikkBeszerzesKivetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CikkBeszerzesKivetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
