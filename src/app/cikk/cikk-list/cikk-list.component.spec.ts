import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CikkListComponent } from './cikk-list.component';

describe('CikkListComponent', () => {
  let component: CikkListComponent;
  let fixture: ComponentFixture<CikkListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CikkListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CikkListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
