import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsoportJogComponent } from './csoport-jog.component';

describe('CsoportJogComponent', () => {
  let component: CsoportJogComponent;
  let fixture: ComponentFixture<CsoportJogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoportJogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoportJogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
