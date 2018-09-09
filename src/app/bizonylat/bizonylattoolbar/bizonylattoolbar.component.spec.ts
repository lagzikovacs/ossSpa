import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BizonylattoolbarComponent } from './bizonylattoolbar.component';

describe('BizonylattoolbarComponent', () => {
  let component: BizonylattoolbarComponent;
  let fixture: ComponentFixture<BizonylattoolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BizonylattoolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BizonylattoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
