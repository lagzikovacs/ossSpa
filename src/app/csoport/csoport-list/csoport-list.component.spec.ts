import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsoportListComponent } from './csoport-list.component';

describe('CsoportListComponent', () => {
  let component: CsoportListComponent;
  let fixture: ComponentFixture<CsoportListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsoportListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsoportListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
