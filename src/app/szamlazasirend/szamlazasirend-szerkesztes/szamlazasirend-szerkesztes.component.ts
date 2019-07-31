import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {SzamlazasirendService} from '../szamlazasirend.service';
import {PenznemService} from '../../primitiv/penznem/penznem.service';
import {PenznemZoomParameter} from '../../primitiv/penznem/penznemzoomparameter';
import {SzamlazasirendSzerkesztesMode} from '../szamlazasirendszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {deepCopy} from '../../tools/deepCopy';
import {PenznemDto} from '../../primitiv/penznem/penznemdto';
import {SzamlazasirendDto} from '../szamlazasirenddto';

@Component({
  selector: 'app-szamlazasirend-szerkesztes',
  templateUrl: './szamlazasirend-szerkesztes.component.html'
})
export class SzamlazasirendSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new SzamlazasirendDto();
  @Input() set DtoOriginal(value: SzamlazasirendDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Input() Projektkod = -1;
  @Output() eventSzerkeszteskesz = new EventEmitter<SzamlazasirendDto>();

  SzerkesztesMode = SzamlazasirendSzerkesztesMode.Blank;

  szamlazasirendservice: SzamlazasirendService;
  spinnerservice: SpinnerService;

  constructor(private _penznemservice: PenznemService,
              private _errorservice: ErrorService,
              szamlazasirendservice: SzamlazasirendService,
              spinnerservice: SpinnerService) {
    this.szamlazasirendservice = szamlazasirendservice;
    this.spinnerservice = spinnerservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.spinnerservice.eppFrissit = true;
      this.szamlazasirendservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.DtoEdited = res.Result[0];
          this.spinnerservice.eppFrissit = false;
        })
        .catch(err => {
          this.spinnerservice.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }
  }

  onSubmit() {
    this.spinnerservice.eppFrissit = true;

    this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.DtoEdited.Penznemkod || 0,
      this.DtoEdited.Penznem || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        if (this.uj) {
          this.DtoEdited.Projektkod = this.Projektkod;
          return this.szamlazasirendservice.Add(this.DtoEdited);
        } else {
          return this.szamlazasirendservice.Update(this.DtoEdited);
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

        this.spinnerservice.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res2.Result[0]);
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  PenznemZoom() {
    this.SzerkesztesMode = SzamlazasirendSzerkesztesMode.PenznemZoom;
  }
  onPenznemSelectzoom(Dto: PenznemDto) {
    this.DtoEdited.Penznemkod = Dto.Penznemkod;
    this.DtoEdited.Penznem = Dto.Penznem1;
  }
  onPenznemStopzoom() {
    this.SzerkesztesMode = SzamlazasirendSzerkesztesMode.Blank;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
