import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokumentumListComponent } from './dokumentum-list.component';

describe('DokumentumListComponent', () => {
  let component: DokumentumListComponent;
  let fixture: ComponentFixture<DokumentumListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokumentumListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokumentumListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
