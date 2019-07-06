import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VolumeService} from '../volume.service';
import {DokumentumService} from '../../dokumentum/dokumentum.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';

@Component({
  selector: 'app-volume-teszt',
  templateUrl: './volume-teszt.component.html'
})
export class VolumeTesztComponent implements OnInit, OnDestroy {
  @Input() Volumekod = -1;

  dbv = new Array<number>();
  index = 0;
  hibalista: string[];
  eppTesztel = false;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  volumeservice: VolumeService;
  dokumentumservice: DokumentumService;

  constructor(private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService,
              volumeservice: VolumeService,
              dokumentumservice: DokumentumService) {
    this.volumeservice = volumeservice;
    this.dokumentumservice = dokumentumservice;
  }

  ngOnInit() {
    this.eppFrissit = true;
    this.volumeservice.DokumentumkodByVolume(this.Volumekod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.eppFrissit = false;
        this.dbv = res.Result;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onInditas() {
    this.index = 0;
    this.hibalista = new Array<string>();
    this.eppTesztel = true;

    this.ciklus();
  }

  ciklus() {
    this.dokumentumservice.Ellenorzes(this.dbv[this.index])
      .then(res => {
        if (res.Error != null) {
          this.hibalista.push(this.dbv[this.index] + ': ' + res.Error);
        }
        // TODO: lejárt sid esetén nem kéne folytatni

        this.next();
      })
      .catch(err => {
        this.hibalista.push(this.dbv[this.index] + ': ' + err);
        this.next();
      });
  }
  next() {
    if (this.eppTesztel) {
      if (++this.index < this.dbv.length) {
        this.ciklus();
      } else {
        this.eppTesztel = false;
      }
    }
  }

  onLeallitas() {
    this.eppTesztel = false;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
