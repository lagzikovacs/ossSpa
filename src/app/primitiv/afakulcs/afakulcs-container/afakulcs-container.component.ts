import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AfakulcsService} from '../afakulcs.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';

@Component({
  selector: 'app-afakulcs-container',
  templateUrl: './afakulcs-container.component.html',
  styleUrls: ['./afakulcs-container.component.css']
})
export class AfakulcsContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  afakulcsservice: AfakulcsService;
  eppFrissit = false;

  constructor(afakulcsservice: AfakulcsService) {
    this.afakulcsservice = afakulcsservice;
  }

  ngOnInit() {
    if (this.afakulcsservice.GridSettings === undefined || this.afakulcsservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.afakulcsservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.afakulcsservice.GridSettings = res.Result;

          return this.afakulcsservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.afakulcsservice.ReszletekSettings = res1.Result;

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
