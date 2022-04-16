import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit} from '@angular/core';
import {VolumeService} from '../volume.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {DokumentumService} from '../../../dokumentum/dokumentum.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-volume-teszt',
  templateUrl: './volume-teszt.component.html'
})
export class VolumeTesztComponent implements OnInit, OnDestroy {
  @Input() Volumekod = -1;

  dbv = new Array<number>();
  index = 0;
  hibalista: string[];
  eppTesztel = false;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  volumeservice: VolumeService;
  dokumentumservice: DokumentumService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              volumeservice: VolumeService,
              dokumentumservice: DokumentumService) {
    this.volumeservice = volumeservice;
    this.dokumentumservice = dokumentumservice;
  }

  async ngOnInit() {
    this.spinner = true;
    try {
      const res = await this.volumeservice.DokumentumkodByVolume(this.Volumekod);
      if (res.Error != null) {
        throw res.Error;
      }

      this.dbv = res.Result;
      this.spinner = false;

    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  onInditas() {
    this.index = 0;
    this.hibalista = new Array<string>();
    this.eppTesztel = true;
    this.docdr();

    this.ciklus();
  }

  async ciklus() {
    try {
      const res = await this.dokumentumservice.Ellenorzes(this.dbv[this.index]);
      if (res.Error != null) {
        this.hibalista.push(this.dbv[this.index] + ': ' + res.Error);
        this.docdr();
      }

      if (this.eppTesztel) {
        if (++this.index < this.dbv.length) {
          this.docdr();
          this.ciklus();
        } else {
          this.eppTesztel = false;
          this.docdr();
        }
      }
    } catch (err) {
      this._errorservice.Error = err;
    }
  }

  onLeallitas() {
    this.eppTesztel = false;
    this.docdr();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
