import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CikkEgyComponent } from './cikk-egy.component';

describe('CikkEgyComponent', () => {
  let component: CikkEgyComponent;
  let fixture: ComponentFixture<CikkEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CikkEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CikkEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
