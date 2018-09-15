import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylattermekdijtablaComponent } from './bizonylattermekdijtabla.component';

describe('BizonylattermekdijtablaComponent', () => {
  let component: BizonylattermekdijtablaComponent;
  let fixture: ComponentFixture<BizonylattermekdijtablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylattermekdijtablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylattermekdijtablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
