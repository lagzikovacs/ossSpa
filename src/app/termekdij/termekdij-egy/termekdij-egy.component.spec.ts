import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekdijEgyComponent } from './termekdij-egy.component';

describe('TermekdijEgyComponent', () => {
  let component: TermekdijEgyComponent;
  let fixture: ComponentFixture<TermekdijEgyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermekdijEgyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermekdijEgyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
