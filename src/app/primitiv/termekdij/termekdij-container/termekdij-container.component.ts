import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {TermekdijService} from '../termekdij.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';

@Component({
  selector: 'app-termekdij-container',
  templateUrl: './termekdij-container.component.html',
  styleUrls: ['./termekdij-container.component.css']
})
export class TermekdijContainerComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  termekdijservice: TermekdijService;
  eppFrissit = false;

  constructor(termekdijservice: TermekdijService) {
    this.termekdijservice = termekdijservice;
  }

  ngOnInit() {
    if (this.termekdijservice.GridSettings === undefined || this.termekdijservice.ReszletekSettings === undefined) {
      this.eppFrissit = true;
      this.termekdijservice.GetGridSettings()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.termekdijservice.GridSettings = res.Result;

          return this.termekdijservice.GetReszletekSettings();
        })
        .then(res1 => {
          if (res1.Error !== null) {
            throw res1.Error;
          }

          this.termekdijservice.ReszletekSettings = res1.Result;

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
