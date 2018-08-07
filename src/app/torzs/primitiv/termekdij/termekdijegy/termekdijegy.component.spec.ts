import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekdijegyComponent } from './termekdijegy.component';

describe('TermekdijegyComponent', () => {
  let component: TermekdijegyComponent;
  let fixture: ComponentFixture<TermekdijegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermekdijegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermekdijegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
