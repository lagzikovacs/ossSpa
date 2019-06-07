import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {HelysegService} from '../helyseg.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';

@Component({
  selector: 'app-helyseg-container',
  templateUrl: './helyseg-container.component.html'
})
export class HelysegContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  helysegservice: HelysegService;
  eppFrissit = false;

  constructor(helysegservice: HelysegService) {
    this.helysegservice = helysegservice;
  }

  ngOnInit() {
    if (this.helysegservice.GridSettings === undefined || this.helysegservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.helysegservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.helysegservice.GridSettings = res.Result;

          return this.helysegservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.helysegservice.ReszletekSettings = res1.Result;

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
