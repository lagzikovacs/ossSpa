import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekdijComponent } from './termekdij.component';

describe('TermekdijComponent', () => {
  let component: TermekdijComponent;
  let fixture: ComponentFixture<TermekdijComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermekdijComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermekdijComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
