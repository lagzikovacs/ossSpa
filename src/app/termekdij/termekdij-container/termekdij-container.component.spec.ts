import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermekdijContainerComponent } from './termekdij-container.component';

describe('TermekdijContainerComponent', () => {
  let component: TermekdijContainerComponent;
  let fixture: ComponentFixture<TermekdijContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermekdijContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermekdijContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
