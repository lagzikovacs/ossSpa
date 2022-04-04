import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {UgyfelService} from '../../01 Torzsadatok/09 Ugyfel/ugyfel.service';
import {HelysegService} from '../../01 Torzsadatok/07 Helyseg/helyseg.service';
import {HelysegZoomParam} from '../../01 Torzsadatok/07 Helyseg/helysegzoomparam';
import {UgyfelSzerkesztesMode} from '../../01 Torzsadatok/09 Ugyfel/ugyfelszerkesztesmode';
import {ErrorService} from '../../common/errorbox/error.service';
import {deepCopy} from '../../common/deepCopy';
import {HelysegDto} from '../../01 Torzsadatok/07 Helyseg/helysegdto';
import {UgyfelDto} from '../../01 Torzsadatok/09 Ugyfel/ugyfeldto';
import {TevekenysegDto} from '../../01 Torzsadatok/08 Tevekenyseg/tevekenysegdto';
import {TevekenysegService} from '../../01 Torzsadatok/08 Tevekenyseg/tevekenyseg.service';
import {TevekenysegZoomParam} from '../../01 Torzsadatok/08 Tevekenyseg/tevekenysegzoomparam';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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

  form: FormGroup;
  eppFrissit = false;

  ugyfelzoombox: any;

  SzerkesztesMode = UgyfelSzerkesztesMode.Blank;

  ugyfelservice: UgyfelService;

  constructor(private _helysegservice: HelysegService,
              private _tevekenysegservice: TevekenysegService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              ugyfelservice: UgyfelService) {
    this.ugyfelservice = ugyfelservice;

    this.form = this._fb.group({
      'nev': ['', [Validators.required, Validators.maxLength(200)]],
      'iranyitoszam': ['', [Validators.required, Validators.maxLength(20)]],
      'helysegnev': ['', [Validators.required, Validators.maxLength(100)]],
      'kozterulet': ['', [Validators.required, Validators.maxLength(100)]],
      'kozterulettipus': ['', [Validators.required, Validators.maxLength(20)]],
      'hazszam': ['', [Validators.required, Validators.maxLength(10)]],
      'telefon': ['', [Validators.required, Validators.maxLength(20)]],
      'email': ['', [Validators.required, Validators.maxLength(50)]],
      'adoszam': ['', [Validators.maxLength(20)]],
      'euadoszam': ['', [Validators.maxLength(20)]],
      'ceg': ['', [Validators.maxLength(200)]],
      'beosztas': ['', [Validators.maxLength(200)]],
      'tevekenyseg': ['', [Validators.required, Validators.maxLength(100)]],
      'egyeblink': ['', [Validators.maxLength(200)]],
      'ajanlotta': ['', [Validators.maxLength(200)]],
      'megjegyzes': ['', [Validators.maxLength(200)]],
    });
  }

  ngOnInit() {
    this.ugyfelzoombox = document.getElementById('ugyfelzoombox');

    if (this.uj) {
      this.eppFrissit = true;
      this.ugyfelservice.CreateNew()
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
    this.form.controls['nev'].setValue(this.DtoEdited.Nev);
    this.form.controls['iranyitoszam'].setValue(this.DtoEdited.Iranyitoszam);
    this.form.controls['helysegnev'].setValue(this.DtoEdited.Helysegnev);
    this.form.controls['kozterulet'].setValue(this.DtoEdited.Kozterulet);
    this.form.controls['kozterulettipus'].setValue(this.DtoEdited.Kozterulettipus);
    this.form.controls['hazszam'].setValue(this.DtoEdited.Hazszam);
    this.form.controls['telefon'].setValue(this.DtoEdited.Telefon);
    this.form.controls['email'].setValue(this.DtoEdited.Email);
    this.form.controls['adoszam'].setValue(this.DtoEdited.Adoszam);
    this.form.controls['euadoszam'].setValue(this.DtoEdited.Euadoszam);
    this.form.controls['ceg'].setValue(this.DtoEdited.Ceg);
    this.form.controls['beosztas'].setValue(this.DtoEdited.Beosztas);
    this.form.controls['tevekenyseg'].setValue(this.DtoEdited.Tevekenyseg);
    this.form.controls['egyeblink'].setValue(this.DtoEdited.Egyeblink);
    this.form.controls['ajanlotta'].setValue(this.DtoEdited.Ajanlotta);
    this.form.controls['megjegyzes'].setValue(this.DtoEdited.Megjegyzes);
  }
  updatedto() {
    this.DtoEdited.Nev = this.form.value['nev'];
    this.DtoEdited.Iranyitoszam = this.form.value['iranyitoszam'];
    this.DtoEdited.Helysegnev = this.form.value['helysegnev'];
    this.DtoEdited.Kozterulet = this.form.value['kozterulet'];
    this.DtoEdited.Kozterulettipus = this.form.value['kozterulettipus'];
    this.DtoEdited.Hazszam = this.form.value['hazszam'];
    this.DtoEdited.Telefon = this.form.value['telefon'];
    this.DtoEdited.Email = this.form.value['email'];
    this.DtoEdited.Adoszam = this.form.value['adoszam'];
    this.DtoEdited.Euadoszam = this.form.value['euadoszam'];
    this.DtoEdited.Ceg = this.form.value['ceg'];
    this.DtoEdited.Beosztas = this.form.value['beosztas'];
    this.DtoEdited.Tevekenyseg = this.form.value['tevekenyseg'];
    this.DtoEdited.Egyeblink = this.form.value['egyeblink'];
    this.DtoEdited.Ajanlotta = this.form.value['ajanlotta'];
    this.DtoEdited.Megjegyzes = this.form.value['megjegyzes'];
  }

  onSubmit() {
    this.eppFrissit = true;
    this.updatedto();

    this._helysegservice.ZoomCheck(new HelysegZoomParam(this.DtoEdited.Helysegkod || 0,
      this.DtoEdited.Helysegnev || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        return this._tevekenysegservice.ZoomCheck(new TevekenysegZoomParam(this.DtoEdited.Tevekenysegkod || 0,
          this.DtoEdited.Tevekenyseg || ''));
      })
      .then(res0 => {
        if (res0.Error !== null) {
          throw res0.Error;
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
    this.updatedto();
    this.SzerkesztesMode = UgyfelSzerkesztesMode.HelysegZoom;
    this.ugyfelzoombox.style.display = 'block';
  }
  onHelysegSelectzoom(Dto: HelysegDto) {
    this.DtoEdited.Helysegkod = Dto.Helysegkod;
    this.DtoEdited.Helysegnev = Dto.Helysegnev;
    this.updateform();
  }
  onHelysegStopzoom() {
    this.SzerkesztesMode = UgyfelSzerkesztesMode.Blank;
    this.ugyfelzoombox.style.display = 'none';
  }

  TevekenysegZoom() {
    this.updatedto();
    this.SzerkesztesMode = UgyfelSzerkesztesMode.TevekenysegZoom;
    this.ugyfelzoombox.style.display = 'block';
  }
  onTevekenysegSelectzoom(Dto: TevekenysegDto) {
    this.DtoEdited.Tevekenysegkod = Dto.Tevekenysegkod;
    this.DtoEdited.Tevekenyseg = Dto.Tevekenyseg1;
    this.updateform();
  }
  onTevekenysegStopzoom() {
    this.SzerkesztesMode = UgyfelSzerkesztesMode.Blank;
    this.ugyfelzoombox.style.display = 'none';
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
