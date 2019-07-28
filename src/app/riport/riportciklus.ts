import {RiportService} from './riport.service';
import {SpinnerService} from '../tools/spinner/spinner.service';
import {ErrorService} from '../tools/errorbox/error.service';
import {b64toBlob} from '../tools/b64toBlob';
import * as FileSaver from 'file-saver';
import {OnDestroy} from '@angular/core';

export class Riportciklus implements OnDestroy {
  private _szamlalo: any;
  megszakitani = false;
  tasktoken = '';

  constructor(private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              private _riportservice: RiportService,
              private _fajlnev: string) {
  }

  ciklus() {
    this._riportservice.TaskCheck(this.tasktoken)
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
          this._szamlalo = setInterval(() => { this.next(); }, 1000);
        }

        if (res.Status === 'Completed') {
          const blob = b64toBlob(res.Riport);
          FileSaver.saveAs(blob, this._fajlnev);
          this._spinnerservice.eppFrissit = false;
        }
      })
      .catch(err => {
        this._spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  next() {
    clearInterval(this._szamlalo);

    if (this.megszakitani) {
      this._riportservice.TaskCancel(this.tasktoken)
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this._spinnerservice.eppFrissit = false;
        })
        .catch(err => {
          this._spinnerservice.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.ciklus();
    }
  }

  ngOnDestroy() {
    clearInterval(this._szamlalo);

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
