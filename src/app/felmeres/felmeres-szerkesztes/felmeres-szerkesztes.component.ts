import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NumberResult} from '../../dtos/numberresult';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FelmeresDto} from '../felmeresdto';
import {deepCopy} from '../../tools/deepCopy';
import {FelmeresService} from '../felmeres.service';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-felmeres-szerkesztes',
  templateUrl: './felmeres-szerkesztes.component.html'
})
export class FelmeresSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  @Input() ProjektBol = false;
  @Input() ProjektDto;

  DtoEdited = new FelmeresDto();
  @Input() set DtoOriginal(value: FelmeresDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<FelmeresDto>();

  form: FormGroup;
  eppFrissit = false;

  felmeresservice: FelmeresService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              felmeresservice: FelmeresService) {
    this.felmeresservice = felmeresservice;

    this.form = this._fb.group({
      'nev': ['', [Validators.required, Validators.maxLength(100)]],
      'cim': ['', [Validators.required, Validators.maxLength(100)]],
      'email': ['', [Validators.required, Validators.maxLength(100)]],
      'telefonszam': ['', [Validators.required, Validators.maxLength(100)]],
      'megjegyzes': ['', [Validators.maxLength(200)]],
    });
  }

  ngOnInit(): void {
    if (this.uj) {
      this.eppFrissit = true;
      this.felmeresservice.CreateNew()
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          this.DtoEdited = res.Result[0];

          if (this.ProjektBol) {
            this.DtoEdited.Projektkod = this.ProjektDto.Projektkod;

            this.DtoEdited.Nev = this.ProjektDto.Ugyfelnev;
            this.DtoEdited.Email = this.ProjektDto.Ugyfelemail;
            this.DtoEdited.Telefonszam = this.ProjektDto.Ugyfeltelefonszam;
            this.DtoEdited.Telepitesicim = this.ProjektDto.Telepitesicim;
          }

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

  onCancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  updateform() {
    this.form.controls['nev'].setValue(this.DtoEdited.Nev);
    this.form.controls['cim'].setValue(this.DtoEdited.Telepitesicim);
    this.form.controls['email'].setValue(this.DtoEdited.Email);
    this.form.controls['telefonszam'].setValue(this.DtoEdited.Telefonszam);
    this.form.controls['megjegyzes'].setValue(this.DtoEdited.Megjegyzes);
  }
  updatedto() {
    this.DtoEdited.Nev = this.form.value['nev'];
    this.DtoEdited.Telepitesicim = this.form.value['cim'];
    this.DtoEdited.Email = this.form.value['email'];
    this.DtoEdited.Telefonszam = this.form.value['telefonszam'];
    this.DtoEdited.Megjegyzes = this.form.value['megjegyzes'];
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;
    this.updatedto();

    if (this.uj) {
      p = this.felmeresservice.Add(this.DtoEdited);
    } else {
      p = this.felmeresservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.felmeresservice.Get(res.Result);
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

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
