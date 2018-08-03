import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KovetelesComponent } from './koveteles.component';

describe('KovetelesComponent', () => {
  let component: KovetelesComponent;
  let fixture: ComponentFixture<KovetelesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KovetelesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KovetelesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
