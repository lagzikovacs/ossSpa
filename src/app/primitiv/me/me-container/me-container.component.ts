import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MeService} from '../me.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';

@Component({
  selector: 'app-me-container',
  templateUrl: './me-container.component.html',
  styleUrls: ['./me-container.component.css']
})
export class MeContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  meservice: MeService;
  eppFrissit = false;

  constructor(meservice: MeService) {
    this.meservice = meservice;
  }

  ngOnInit() {
    if (this.meservice.GridSettings === undefined || this.meservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.meservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.meservice.GridSettings = res.Result;

          return this.meservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.meservice.ReszletekSettings = res1.Result;

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
