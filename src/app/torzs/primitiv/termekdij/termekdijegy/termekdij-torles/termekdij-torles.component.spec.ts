import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekdijTorlesComponent } from './termekdij-torles.component';

describe('TermekdijTorlesComponent', () => {
  let component: TermekdijTorlesComponent;
  let fixture: ComponentFixture<TermekdijTorlesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermekdijTorlesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermekdijTorlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
