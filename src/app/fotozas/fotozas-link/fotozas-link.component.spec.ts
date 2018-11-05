import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotozasLinkComponent } from './fotozas-link.component';

describe('FotozasLinkComponent', () => {
  let component: FotozasLinkComponent;
  let fixture: ComponentFixture<FotozasLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotozasLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotozasLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
