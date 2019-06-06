import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PenztartetelService} from '../penztartetel.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';

@Component({
  selector: 'app-penztartetel-container',
  templateUrl: './penztartetel-container.component.html',
  styleUrls: ['./penztartetel-container.component.css']
})
export class PenztartetelContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penztartetelservice: PenztartetelService;
  eppFrissit = false;

  constructor(penztartetelservice: PenztartetelService) {
    this.penztartetelservice = penztartetelservice;
  }

  ngOnInit() {
    if (this.penztartetelservice.GridSettings === undefined || this.penztartetelservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.penztartetelservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.penztartetelservice.GridSettings = res.Result;

          return this.penztartetelservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.penztartetelservice.ReszletekSettings = res1.Result;

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
