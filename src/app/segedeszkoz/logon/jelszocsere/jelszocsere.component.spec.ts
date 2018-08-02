import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JelszocsereComponent } from './jelszocsere.component';

describe('JelszocsereComponent', () => {
  let component: JelszocsereComponent;
  let fixture: ComponentFixture<JelszocsereComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JelszocsereComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JelszocsereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
