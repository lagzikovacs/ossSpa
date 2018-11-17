import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdoszamlekerdezesComponent } from './adoszamlekerdezes.component';

describe('AdoszamlekerdezesComponent', () => {
  let component: AdoszamlekerdezesComponent;
  let fixture: ComponentFixture<AdoszamlekerdezesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdoszamlekerdezesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdoszamlekerdezesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
