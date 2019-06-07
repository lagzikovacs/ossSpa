import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PenztarService} from '../penztar.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-penztar-container',
  templateUrl: './penztar-container.component.html'
})
export class PenztarContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penztarservice: PenztarService;
  eppFrissit = false;

  constructor(penztarservice: PenztarService) {
    this.penztarservice = penztarservice;
  }

  ngOnInit() {
    if (this.penztarservice.GridSettings === undefined || this.penztarservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.penztarservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.penztarservice.GridSettings = res.Result;

          return this.penztarservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.penztarservice.ReszletekSettings = res1.Result;

          this.eppFrissit = false;
        })
        .catch(err => {
          this.errormodal.show(err);
          this.eppFrissit = false;
        });
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
