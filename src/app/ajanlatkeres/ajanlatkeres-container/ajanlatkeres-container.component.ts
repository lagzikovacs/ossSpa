import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AjanlatkeresService} from '../ajanlatkeres.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-ajanlatkeres-container',
  templateUrl: './ajanlatkeres-container.component.html'
})
export class AjanlatkeresContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ajanlatkeresservice: AjanlatkeresService;
  eppFrissit = false;

  constructor(ajanlatkeresservice: AjanlatkeresService) {
    this.ajanlatkeresservice = ajanlatkeresservice;
  }

  ngOnInit() {
    if (this.ajanlatkeresservice.GridSettings === undefined || this.ajanlatkeresservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.ajanlatkeresservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.ajanlatkeresservice.GridSettings = res.Result;

          return this.ajanlatkeresservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.ajanlatkeresservice.ReszletekSettings = res1.Result;

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
