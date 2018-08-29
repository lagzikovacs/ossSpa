import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekdijListComponent } from './termekdij-list.component';

describe('TermekdijListComponent', () => {
  let component: TermekdijListComponent;
  let fixture: ComponentFixture<TermekdijListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermekdijListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermekdijListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
