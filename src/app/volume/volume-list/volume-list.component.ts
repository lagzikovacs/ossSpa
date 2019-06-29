import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VolumeService} from '../volume.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';

@Component({
  selector: 'app-volume-list',
  templateUrl: './volume-list.component.html'
})
export class VolumeListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla') tabla: TablaComponent;

  elsokereses = true;
  volumeservice: VolumeService;

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(volumeservice: VolumeService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.volumeservice = volumeservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.elsokereses = true;
    this.volumeservice.ekDto.rekordtol = 0;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.volumeservice.Read()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.volumeservice.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.volumeservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.volumeservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  setClickedRow(i: number) {
    this.volumeservice.DtoSelectedIndex = i;
  }

  torlesutan() {
    this.tabla.clearselections();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
