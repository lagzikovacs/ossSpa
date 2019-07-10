import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import * as FileSaver from 'file-saver';
import {RiportService} from '../../riport/riport.service';
import {Szempont} from '../../enums/szempont';
import {SzMT} from '../../dtos/szmt';
import {ProjektService} from '../projekt.service';
import {b64toBlob} from '../../tools/b64toBlob';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-projekt-export',
  templateUrl: './projekt-export.component.html'
})
export class ProjektExportComponent implements OnDestroy {
  @Input() statuszszempont = -1;
  @Input() projektcsoport = '';
  @Output() eventBezar = new EventEmitter<void>();

  megszakitani = false;

  tasktoken = '';
  szamlalo: any;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  projektservice: ProjektService;
  riportservice: RiportService;

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              projektservice: ProjektService,
              riportservice: RiportService) {
    this.projektservice = projektservice,
    this.riportservice = riportservice;
  }

  onSubmit() {
    this.eppFrissit = true;
    this.megszakitani = false;

    const fi = [
      new SzMT(Szempont.Null, this.statuszszempont.toString()),
      new SzMT(Szempont.Null, this.projektcsoport)
    ];

    this.riportservice.ProjektTaskStart(fi)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.tasktoken = res.Result;
        this.ciklus();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  ciklus() {
    this.riportservice.TaskCheck(this.tasktoken)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        if (res.Status === 'Cancelled') {
          throw new Error('Felhasználói megszakítás!');
        }
        if (res.Status === 'Error') {
          throw new Error('Hm... ' + res.Error);
        }
        if (res.Status === 'Queued' || res.Status === 'Running') {
          this.szamlalo = setInterval(() => { this.next(); }, 1000);
        }

        if (res.Status === 'Completed') {
          const blob = b64toBlob(res.Riport);
          FileSaver.saveAs(blob, 'Projekt.xls');
          this.eppFrissit = false;

          this.eventBezar.emit();
        }
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  next() {
    clearInterval(this.szamlalo);

    if (this.megszakitani) {
      this.riportservice.TaskCancel(this.tasktoken)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.ciklus();
    }
  }

  onCancel() {
    this.eventBezar.emit();
  }

  ngOnDestroy() {
    clearInterval(this.szamlalo);

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }

}
