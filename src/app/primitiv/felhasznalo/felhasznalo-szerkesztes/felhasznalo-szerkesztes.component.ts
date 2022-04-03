import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FelhasznaloService} from '../../../05 Segedeszkozok/03 Felhasznalo/felhasznalo.service';
import {NumberResult} from '../../../common/dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {FelhasznaloDto} from '../../../05 Segedeszkozok/03 Felhasznalo/felhasznalodto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-felhasznalo-szerkesztes',
  templateUrl: './felhasznalo-szerkesztes.component.html'
})
export class FelhasznaloSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new FelhasznaloDto();
  @Input() set DtoOriginal(value: FelhasznaloDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<FelhasznaloDto>();

  form: FormGroup;
  eppFrissit = false;

  felhasznaloservice: FelhasznaloService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              felhasznaloservice: FelhasznaloService) {
    this.felhasznaloservice = felhasznaloservice;

    this.form = this._fb.group({
      'azonosito': ['', [Validators.required, Validators.maxLength(30)]],
      'nev': ['', [Validators.required, Validators.maxLength(100)]],
      'telefon': ['', [Validators.required, Validators.maxLength(50)]],
      'email': ['', [Validators.required, Validators.email, Validators.maxLength(50)]],
      'statusz': ['', [Validators.required, Validators.maxLength(10)]],
      'logonlog': ['', [Validators.required]],
    });
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.felhasznaloservice.CreateNew()
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
    this.form.controls['azonosito'].setValue(this.DtoEdited.Azonosito);
    this.form.controls['nev'].setValue(this.DtoEdited.Nev);
    this.form.controls['telefon'].setValue(this.DtoEdited.Telefon);
    this.form.controls['email'].setValue(this.DtoEdited.Email);
    this.form.controls['statusz'].setValue(this.DtoEdited.Statusz);
    this.form.controls['logonlog'].setValue(this.DtoEdited.Logonlog);
  }
  updatedto() {
    this.DtoEdited.Azonosito = this.form.value['azonosito'];
    this.DtoEdited.Nev = this.form.value['nev'];
    this.DtoEdited.Telefon = this.form.value['telefon'];
    this.DtoEdited.Email = this.form.value['email'];
    this.DtoEdited.Statusz = this.form.value['statusz'];
    this.DtoEdited.Logonlog = this.form.value['logonlog'] === 'true' ? true : false;
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;
    this.updatedto();

    if (this.uj) {
      p = this.felhasznaloservice.Add(this.DtoEdited);
    } else {
      p = this.felhasznaloservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.felhasznaloservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.eppFrissit = false;
        this.eventSzerkeszteskesz.emit(res1.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onCancel() {
    this.eventSzerkeszteskesz.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
