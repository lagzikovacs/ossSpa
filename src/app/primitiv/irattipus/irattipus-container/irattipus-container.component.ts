import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IrattipusService} from '../irattipus.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';

@Component({
  selector: 'app-irattipus-container',
  templateUrl: './irattipus-container.component.html'
})
export class IrattipusContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  irattipusservice: IrattipusService;
  eppFrissit = false;

  constructor(irattipusservice: IrattipusService) {
    this.irattipusservice = irattipusservice;
  }

  ngOnInit() {
    if (this.irattipusservice.GridSettings === undefined || this.irattipusservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.irattipusservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.irattipusservice.GridSettings = res.Result;

          return this.irattipusservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.irattipusservice.ReszletekSettings = res1.Result;

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
