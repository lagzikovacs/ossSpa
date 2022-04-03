import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AjanlatkeresDto} from '../ajanlatkeresdto';
import {AjanlatkeresService} from '../ajanlatkeres.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {deepCopy} from '../../tools/deepCopy';
import {NumberResult} from '../../common/dtos/numberresult';

@Component({
  selector: 'app-ajanlatkeres-szerkesztes',
  templateUrl: './ajanlatkeres-szerkesztes.component.html'
})
export class AjanlatkeresSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new AjanlatkeresDto();
  @Input() set DtoOriginal(value: AjanlatkeresDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<AjanlatkeresDto>();

  form: FormGroup;
  eppFrissit = false;

  ajanlatkeresservice: AjanlatkeresService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              ajanlatkeresservice: AjanlatkeresService) {
    this.ajanlatkeresservice = ajanlatkeresservice;

    this.form = this._fb.group({
      'nev': ['', [Validators.required, Validators.maxLength(100)]],
      'cim': ['', [Validators.required, Validators.maxLength(100)]],
      'email': ['', [Validators.required, Validators.maxLength(100)]],
      'telefonszam': ['', [Validators.required, Validators.maxLength(100)]],
      'havifogyasztaskwh': [0, [Validators.min(0)]],
      'haviszamlaft': [0, [Validators.min(0)]],
      'napelemekteljesitmenyekw': [0, [Validators.min(0)]],
      'megjegyzes': ['', [Validators.maxLength(200)]],
    });
  }

  ngOnInit(): void {
    if (this.uj) {
      this.eppFrissit = true;
      this.ajanlatkeresservice.CreateNew()
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
    this.form.controls['cim'].setValue(this.DtoEdited.Cim);
    this.form.controls['email'].setValue(this.DtoEdited.Email);
    this.form.controls['telefonszam'].setValue(this.DtoEdited.Telefonszam);
    this.form.controls['havifogyasztaskwh'].setValue(this.DtoEdited.Havifogyasztaskwh);
    this.form.controls['haviszamlaft'].setValue(this.DtoEdited.Haviszamlaft);
    this.form.controls['napelemekteljesitmenyekw'].setValue(this.DtoEdited.Napelemekteljesitmenyekw);
    this.form.controls['megjegyzes'].setValue(this.DtoEdited.Megjegyzes);
  }
  updatedto() {
    this.DtoEdited.Nev = this.form.value['nev'];
    this.DtoEdited.Cim = this.form.value['cim'];
    this.DtoEdited.Email = this.form.value['email'];
    this.DtoEdited.Telefonszam = this.form.value['telefonszam'];
    this.DtoEdited.Havifogyasztaskwh = this.form.value['havifogyasztaskwh'];
    this.DtoEdited.Haviszamlaft = this.form.value['haviszamlaft'];
    this.DtoEdited.Napelemekteljesitmenyekw = this.form.value['napelemekteljesitmenyekw'];
    this.DtoEdited.Megjegyzes = this.form.value['megjegyzes'];
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;
    this.updatedto();

    if (this.uj) {
      p = this.ajanlatkeresservice.Add(this.DtoEdited);
    } else {
      p = this.ajanlatkeresservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.ajanlatkeresservice.Get(res.Result);
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
    this.eventSzerkeszteskesz.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
