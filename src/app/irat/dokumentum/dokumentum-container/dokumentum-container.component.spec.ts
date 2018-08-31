import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentumContainerComponent } from './dokumentum-container.component';

describe('DokumentumContainerComponent', () => {
  let component: DokumentumContainerComponent;
  let fixture: ComponentFixture<DokumentumContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumentumContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumentumContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
