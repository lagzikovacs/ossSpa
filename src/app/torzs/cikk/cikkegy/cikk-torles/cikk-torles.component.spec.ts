import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CikkTorlesComponent } from './cikk-torles.component';

describe('CikkTorlesComponent', () => {
  let component: CikkTorlesComponent;
  let fixture: ComponentFixture<CikkTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CikkTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CikkTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
