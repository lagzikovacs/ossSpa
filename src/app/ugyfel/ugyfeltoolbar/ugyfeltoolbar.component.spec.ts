import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UgyfeltoolbarComponent } from './ugyfeltoolbar.component';

describe('UgyfeltoolbarComponent', () => {
  let component: UgyfeltoolbarComponent;
  let fixture: ComponentFixture<UgyfeltoolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UgyfeltoolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UgyfeltoolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
