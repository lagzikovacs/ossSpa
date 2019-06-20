import {Component, OnDestroy} from '@angular/core';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {BizonylatnyomtatasService} from '../bizonylatnyomtatas.service';
import {SzMT} from '../../dtos/szmt';
import {Szempont} from '../../enums/szempont';
import {BizonylatNyomtatasTipus} from '../bizonylatnyomtatastipus';
import * as FileSaver from 'file-saver';
import {b64toBlob} from '../../tools/b64toBlob';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-bizonylat-nyomtatas',
  templateUrl: './bizonylat-nyomtatas.component.html'
})
export class BizonylatNyomtatasComponent implements OnDestroy {

  entries = ['Minta', 'Eredeti', 'Másolat'];
  entriest = [BizonylatNyomtatasTipus.Minta, BizonylatNyomtatasTipus.Eredeti, BizonylatNyomtatasTipus.Masolat];
  selectedi = 0;
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

  constructor(private _bizonylatnyomtatasservice: BizonylatnyomtatasService,
              private _bizonylatservice: BizonylatService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService) {
  }

  change(i) {
    this.selectedi = i;
  }

  onSubmit() {
    this.eppFrissit = true;
    this.megszakitani = false;

    const fi = [
      new SzMT(Szempont.BizonylatKod, this._bizonylatservice.Dto[this._bizonylatservice.DtoSelectedIndex].Bizonylatkod),
      new SzMT(Szempont.NyomtatasTipus, this.entriest[this.selectedi])
    ];

    this._bizonylatnyomtatasservice.TaskStart(fi)
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
    this._bizonylatnyomtatasservice.TaskCheck(this.tasktoken)
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
          FileSaver.saveAs(blob, 'Bizonylat.pdf');
          this.eppFrissit = false;
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
      this._bizonylatnyomtatasservice.TaskCancel(this.tasktoken)
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

  megsem() {
    this.megszakitani = true;
  }
  ngOnDestroy() {
    clearInterval(this.szamlalo);

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
