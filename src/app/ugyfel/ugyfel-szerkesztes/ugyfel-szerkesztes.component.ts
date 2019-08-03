import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UgyfelService} from '../ugyfel.service';
import {HelysegService} from '../../primitiv/helyseg/helyseg.service';
import {HelysegZoomParameter} from '../../primitiv/helyseg/helysegzoomparameter';
import {UgyfelSzerkesztesMode} from '../ugyfelszerkesztesmode';
import {ErrorService} from '../../tools/errorbox/error.service';
import {deepCopy} from '../../tools/deepCopy';
import {HelysegDto} from '../../primitiv/helyseg/helysegdto';
import {UgyfelDto} from '../ugyfeldto';

@Component({
  selector: 'app-ugyfel-szerkesztes',
  templateUrl: './ugyfel-szerkesztes.component.html'
})
export class UgyfelSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new UgyfelDto();
  @Input() set DtoOriginal(value: UgyfelDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<UgyfelDto>();

  eppFrissit = false;

  SzerkesztesMode = UgyfelSzerkesztesMode.Blank;

  ugyfelservice: UgyfelService;

  constructor(private _helysegservice: HelysegService,
              private _errorservice: ErrorService,
              ugyfelservice: UgyfelService) {
    this.ugyfelservice = ugyfelservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.ugyfelservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.DtoEdited = res.Result[0];
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    }
  }

  onSubmit() {
    this.eppFrissit = true;
    this._helysegservice.ZoomCheck(new HelysegZoomParameter(this.DtoEdited.Helysegkod || 0,
      this.DtoEdited.Helysegnev || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        if (this.uj) {
          return this.ugyfelservice.Add(this.DtoEdited);
        } else {
          return this.ugyfelservice.Update(this.DtoEdited);
        }
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.ugyfelservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res2.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  HelysegZoom() {
    this.SzerkesztesMode = UgyfelSzerkesztesMode.HelysegZoom;
  }
  onHelysegSelectzoom(Dto: HelysegDto) {
    this.DtoEdited.Helysegkod = Dto.Helysegkod;
    this.DtoEdited.Helysegnev = Dto.Helysegnev;
  }
  onHelysegStopzoom() {
    this.SzerkesztesMode = UgyfelSzerkesztesMode.Blank;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
