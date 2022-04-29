import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {NumberResult} from '../../../common/dtos/numberresult';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FelmeresDto} from '../felmeresdto';
import {deepCopy} from '../../../common/deepCopy';
import {FelmeresService} from '../felmeres.service';
import {ErrorService} from '../../../common/errorbox/error.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  felmeresservice: FelmeresService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              felmeresservice: FelmeresService) {
    this.felmeresservice = felmeresservice;

    this.form = this._fb.group({
      'nev': ['', [Validators.required, Validators.maxLength(100)]],
      'cim': ['', [Validators.required, Validators.maxLength(100)]],
      'email': ['', [Validators.required, Validators.maxLength(100)]],
      'telefonszam': ['', [Validators.required, Validators.maxLength(100)]],
      'inverter': ['', [Validators.required, Validators.maxLength(50)]],
      'napelem': ['', [Validators.required, Validators.maxLength(50)]],
      'megjegyzes': ['', [Validators.required]],
    });
  }

  async ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      try {
        const res = await this.felmeresservice.CreateNew();
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
          this.DtoEdited.Inverter = this.ProjektDto.Inverter;
          this.DtoEdited.Napelem = this.ProjektDto.Napelem;
        }

        this.updateform();
        this.spinner = false;
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    } else {
      this.updateform();
    }
  }

  updateform() {
    this.form.controls['nev'].setValue(this.DtoEdited.Nev);
    this.form.controls['cim'].setValue(this.DtoEdited.Telepitesicim);
    this.form.controls['email'].setValue(this.DtoEdited.Email);
    this.form.controls['telefonszam'].setValue(this.DtoEdited.Telefonszam);
    this.form.controls['inverter'].setValue(this.DtoEdited.Inverter);
    this.form.controls['napelem'].setValue(this.DtoEdited.Napelem);
    this.form.controls['megjegyzes'].setValue(this.DtoEdited.Megjegyzes);
  }
  updatedto() {
    this.DtoEdited.Nev = this.form.value['nev'];
    this.DtoEdited.Telepitesicim = this.form.value['cim'];
    this.DtoEdited.Email = this.form.value['email'];
    this.DtoEdited.Telefonszam = this.form.value['telefonszam'];
    this.DtoEdited.Inverter = this.form.value['inverter'];
    this.DtoEdited.Napelem = this.form.value['napelem'];
    this.DtoEdited.Megjegyzes = this.form.value['megjegyzes'];
  }

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      let res: NumberResult;
      if (this.uj) {
        res = await this.felmeresservice.Add(this.DtoEdited);
      } else {
        res = await this.felmeresservice.Update(this.DtoEdited);
      }
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.felmeresservice.Get(res.Result);
      if (res1.Error != null) {
        throw res1.Error;
      }

      this.spinner = false;
      this.eventSzerkeszteskesz.emit(res1.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
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
