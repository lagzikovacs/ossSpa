import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CikkComponent } from './cikk.component';

describe('CikkComponent', () => {
  let component: CikkComponent;
  let fixture: ComponentFixture<CikkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CikkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CikkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
