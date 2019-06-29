import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {PenznemService} from '../../primitiv/penznem/penznem.service';
import {ZoomSources} from '../../enums/zoomsources';
import {PenznemZoomParameter} from '../../primitiv/penznem/penznemzoomparameter';
import {ProjektService} from '../../projekt/projekt.service';
import {SzamlazasirendSzerkesztesMode} from '../szamlazasirendszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {deepCopy} from '../../tools/deepCopy';
import {propCopy} from '../../tools/propCopy';

@Component({
  selector: 'app-szamlazasirend-szerkesztes',
  templateUrl: './szamlazasirend-szerkesztes.component.html'
})
export class SzamlazasirendSzerkesztesComponent implements OnInit, OnDestroy {
  szamlazasirendservice: SzamlazasirendService;

  @Input() uj = false;
  @Output() eventSzerkeszteskesz = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(szamlazasirendservice: SzamlazasirendService,
              private _penznemservice: PenznemService,
              private _projektservice: ProjektService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
    this.szamlazasirendservice = szamlazasirendservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.szamlazasirendservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.szamlazasirendservice.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.szamlazasirendservice.DtoEdited = deepCopy(this.szamlazasirendservice.Dto[this.szamlazasirendservice.DtoSelectedIndex]);
    }
  }

  onSubmit() {
    this.eppFrissit = true;

    this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.szamlazasirendservice.DtoEdited.Penznemkod || 0,
      this.szamlazasirendservice.DtoEdited.Penznem || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        if (this.uj) {
          this.szamlazasirendservice.DtoEdited.Projektkod = this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod;
          return this.szamlazasirendservice.Add(this.szamlazasirendservice.DtoEdited);
        } else {
          return this.szamlazasirendservice.Update(this.szamlazasirendservice.DtoEdited);
        }
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.szamlazasirendservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        if (this.uj) {
          this.szamlazasirendservice.Dto.unshift(res2.Result[0]);
        } else {
          propCopy(res2.Result[0], this.szamlazasirendservice.Dto[this.szamlazasirendservice.DtoSelectedIndex]);
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit();
  }

  PenznemZoom() {
    this._penznemservice.ekDto.minta = this.szamlazasirendservice.DtoEdited.Penznem || '';
    this._penznemservice.zoomsource = ZoomSources.Szamlazasirend;
    this._penznemservice.zoom = true;

    this.szamlazasirendservice.SzerkesztesMode = SzamlazasirendSzerkesztesMode.PenznemZoom;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
