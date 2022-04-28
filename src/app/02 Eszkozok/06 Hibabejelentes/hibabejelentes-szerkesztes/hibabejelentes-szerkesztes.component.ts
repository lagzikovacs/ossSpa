import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {deepCopy} from '../../../common/deepCopy';
import {HibabejelentesDto} from '../hibabejelentesdto';
import {HibabejelentesService} from '../hibabejelentes.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ErrorService} from '../../../common/errorbox/error.service';
import {NumberResult} from '../../../common/dtos/numberresult';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-hibabejelentes-szerkesztes',
  templateUrl: './hibabejelentes-szerkesztes.component.html'
})
export class HibabejelentesSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  @Input() ProjektBol = false;
  @Input() ProjektDto;

  DtoEdited = new HibabejelentesDto();
  @Input() set DtoOriginal(value: HibabejelentesDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<HibabejelentesDto>();

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  hibabejelentesservice: HibabejelentesService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              hibabejelentesservice: HibabejelentesService) {
    this.hibabejelentesservice = hibabejelentesservice;

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
        const res = await this.hibabejelentesservice.CreateNew();
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
        res = await this.hibabejelentesservice.Add(this.DtoEdited);
      } else {
        res = await this.hibabejelentesservice.Update(this.DtoEdited);
      }
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.hibabejelentesservice.Get(res.Result);
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
