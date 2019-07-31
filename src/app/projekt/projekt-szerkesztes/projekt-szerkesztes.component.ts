import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import {PenznemService} from '../../primitiv/penznem/penznem.service';
import {ProjektSzerkesztesMode} from '../projektszerkesztesmode';
import {UgyfelZoomParameter} from '../../ugyfel/ugyfelzoomparameter';
import {PenznemZoomParameter} from '../../primitiv/penznem/penznemzoomparameter';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {deepCopy} from '../../tools/deepCopy';
import {PenznemDto} from '../../primitiv/penznem/penznemdto';
import {UgyfelDto} from '../../ugyfel/ugyfeldto';
import {ProjektDto} from '../projektdto';

@Component({
  selector: 'app-projekt-szerkesztes',
  templateUrl: './projekt-szerkesztes.component.html',
  animations: [rowanimation]
})
export class ProjektSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new ProjektDto();
  @Input() set DtoOriginal(value: ProjektDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<ProjektDto>();

  Keletkezett: any;

  SzerkesztesMode = ProjektSzerkesztesMode.Blank;

  projektservice: ProjektService;
  spinnerservice: SpinnerService;

  constructor(private _ugyfelservice: UgyfelService,
              private _penznemservice: PenznemService,
              private _errorservice: ErrorService,
              spinnerservice: SpinnerService,
              projektservice: ProjektService) {
    this.projektservice = projektservice;
    this.spinnerservice = spinnerservice;
  }

  ngOnInit() {
    if (this.uj) {
      this.spinnerservice.eppFrissit = true;
      this.projektservice.CreateNew()
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
    this._ugyfelservice.ZoomCheck(new UgyfelZoomParameter(this.DtoEdited.Ugyfelkod || 0,
      this.DtoEdited.Ugyfelnev || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        return this._penznemservice.ZoomCheck(new PenznemZoomParameter(this.DtoEdited.Penznemkod || 0,
          this.DtoEdited.Penznem || ''));
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        if (this.uj) {
          return this.projektservice.Add(this.DtoEdited);
        } else {
          return this.projektservice.Update(this.DtoEdited);
        }
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        return this.projektservice.Get(res2.Result);
      })
      .then(res3 => {
        if (res3.Error !== null) {
          throw res3.Error;
        }

        this.spinnerservice.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res3.Result[0]);
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  UgyfelZoom() {
    this.SzerkesztesMode = ProjektSzerkesztesMode.UgyfelZoom;
  }
  onUgyfelSelectzoom(Dto: UgyfelDto) {
    this.DtoEdited.Ugyfelkod = Dto.Ugyfelkod;
    this.DtoEdited.Ugyfelnev = Dto.Nev;
    this.DtoEdited.Ugyfelcim = Dto.Cim;
  }
  onUgyfelStopzoom() {
    this.SzerkesztesMode = ProjektSzerkesztesMode.Blank;
  }

  PenznemZoom() {
    this.SzerkesztesMode = ProjektSzerkesztesMode.PenznemZoom;
  }
  onPenznemSelectzoom(Dto: PenznemDto) {
    this.DtoEdited.Penznemkod = Dto.Penznemkod;
    this.DtoEdited.Penznem = Dto.Penznem1;
  }
  onPenznemStopzoom() {
    this.SzerkesztesMode = ProjektSzerkesztesMode.Blank;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
