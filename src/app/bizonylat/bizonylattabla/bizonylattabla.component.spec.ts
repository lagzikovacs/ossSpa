import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylattablaComponent } from './bizonylattabla.component';

describe('BizonylattablaComponent', () => {
  let component: BizonylattablaComponent;
  let fixture: ComponentFixture<BizonylattablaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylattablaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylattablaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
