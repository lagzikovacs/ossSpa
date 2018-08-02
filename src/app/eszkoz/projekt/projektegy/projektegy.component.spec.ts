import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjektegyComponent } from './projektegy.component';

describe('ProjektegyComponent', () => {
  let component: ProjektegyComponent;
  let fixture: ComponentFixture<ProjektegyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjektegyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjektegyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
