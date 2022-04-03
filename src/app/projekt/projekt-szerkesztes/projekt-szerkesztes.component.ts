import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import {PenznemService} from '../../01 Torzsadatok/03 Penznem/penznem.service';
import {ProjektSzerkesztesMode} from '../projektszerkesztesmode';
import {UgyfelZoomParameter} from '../../ugyfel/ugyfelzoomparameter';
import {PenznemZoomParam} from '../../01 Torzsadatok/03 Penznem/penznemzoomparam';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrorService} from '../../tools/errorbox/error.service';
import {deepCopy} from '../../tools/deepCopy';
import {PenznemDto} from '../../01 Torzsadatok/03 Penznem/penznemdto';
import {UgyfelDto} from '../../ugyfel/ugyfeldto';
import {ProjektDto} from '../projektdto';
import * as moment from 'moment';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  SzerkesztesMode = ProjektSzerkesztesMode.Blank;

  form: FormGroup;
  eppFrissit = false;

  projektzoombox: any;

  projektservice: ProjektService;

  constructor(private _ugyfelservice: UgyfelService,
              private _penznemservice: PenznemService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              projektservice: ProjektService) {
    this.projektservice = projektservice;

    this.form = this._fb.group({
      'ugyfelnev': ['', [Validators.required, Validators.maxLength(200)]],
      'ugyfelcim': [{value: '', disabled: true}, []],
      'telepitesicim': ['', [Validators.maxLength(200)]],
      'projektjellege': ['', [Validators.maxLength(50)]],
      'var': ['0', [Validators.required]],
      'penznem': ['', [Validators.required, Validators.maxLength(3)]],
      'keletkezett': ['', []],
      'megrendelve': ['', []],
      'kivhat': ['', []],
      'megjegyzes': ['', []],
    });
  }

  ngOnInit() {
    this.projektzoombox = document.getElementById('projektzoombox');

    if (this.uj) {
      this.eppFrissit = true;
      this.projektservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.DtoEdited = res.Result[0];
          this.updateform();
          this.eppFrissit = false;
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.updateform();
    }
  }

  updateform() {
    const formKeletkezett = moment(this.DtoEdited.Keletkezett).format('YYYY-MM-DD');
    const formMegrendelve = moment(this.DtoEdited.Megrendelve).format('YYYY-MM-DD');
    const formKivHat = moment(this.DtoEdited.Kivitelezesihatarido).format('YYYY-MM-DD');

    this.form.controls['keletkezett'].setValue(formKeletkezett);
    this.form.controls['megrendelve'].setValue(formMegrendelve);
    this.form.controls['kivhat'].setValue(formKivHat);

    this.form.controls['ugyfelnev'].setValue(this.DtoEdited.Ugyfelnev);
    this.form.controls['ugyfelcim'].setValue(this.DtoEdited.Ugyfelcim);
    this.form.controls['telepitesicim'].setValue(this.DtoEdited.Telepitesicim);
    this.form.controls['projektjellege'].setValue(this.DtoEdited.Projektjellege);
    this.form.controls['var'].setValue(this.DtoEdited.Vallalasiarnetto);
    this.form.controls['penznem'].setValue(this.DtoEdited.Penznem);
    this.form.controls['megjegyzes'].setValue(this.DtoEdited.Megjegyzes);
  }
  updatedto() {
    const dtoKeletkezett = moment(this.form.value['keletkezett']).toISOString(true);
    const dtoMegrendelve = moment(this.form.value['megrendelve']).toISOString(true);
    const dtoKivHat = moment(this.form.value['kivhat']).toISOString(true);

    this.DtoEdited.Keletkezett = dtoKeletkezett;
    this.DtoEdited.Megrendelve = dtoMegrendelve;
    this.DtoEdited.Kivitelezesihatarido = dtoKivHat;

    this.DtoEdited.Ugyfelnev = this.form.value['ugyfelnev'];
    this.DtoEdited.Ugyfelcim = this.form.value['ugyfelcim'];
    this.DtoEdited.Telepitesicim = this.form.value['telepitesicim'];
    this.DtoEdited.Projektjellege = this.form.value['projektjellege'];
    this.DtoEdited.Vallalasiarnetto = this.form.value['var'];
    this.DtoEdited.Penznem = this.form.value['penznem'];
    this.DtoEdited.Megjegyzes = this.form.value['megjegyzes'];
  }

  onSubmit() {
    this.eppFrissit = true;
    this.updatedto();

    this._ugyfelservice.ZoomCheck(new UgyfelZoomParameter(this.DtoEdited.Ugyfelkod || 0,
      this.DtoEdited.Ugyfelnev || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        return this._penznemservice.ZoomCheck(new PenznemZoomParam(this.DtoEdited.Penznemkod || 0,
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

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res3.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  UgyfelZoom() {
    this.updatedto();
    this.SzerkesztesMode = ProjektSzerkesztesMode.UgyfelZoom;
    this.projektzoombox.style.display = 'block';
  }
  onUgyfelSelectzoom(Dto: UgyfelDto) {
    this.DtoEdited.Ugyfelkod = Dto.Ugyfelkod;
    this.DtoEdited.Ugyfelnev = Dto.Nev;
    this.DtoEdited.Ugyfelcim = Dto.Cim;
    this.updateform();
  }
  onUgyfelStopzoom() {
    this.SzerkesztesMode = ProjektSzerkesztesMode.Blank;
    this.projektzoombox.style.display = 'none';
  }

  PenznemZoom() {
    this.updatedto();
    this.SzerkesztesMode = ProjektSzerkesztesMode.PenznemZoom;
    this.projektzoombox.style.display = 'block';
  }
  onPenznemSelectzoom(Dto: PenznemDto) {
    this.DtoEdited.Penznemkod = Dto.Penznemkod;
    this.DtoEdited.Penznem = Dto.Penznem1;
    this.updateform();
  }
  onPenznemStopzoom() {
    this.SzerkesztesMode = ProjektSzerkesztesMode.Blank;
    this.projektzoombox.style.display = 'none';
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
