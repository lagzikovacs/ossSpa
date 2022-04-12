import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../common/deepCopy';
import {ProjektDto} from '../../02 Eszkozok/01 Projekt/projekt/projektdto';
import {ProjektService} from '../../02 Eszkozok/01 Projekt/projekt/projekt.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-projekt-muszakiallapot',
  templateUrl: './projekt-muszakiallapot.component.html',
  animations: [rowanimation]
})
export class ProjektMuszakiallapotComponent implements OnInit, OnDestroy {
  @Input() eppFrissit: boolean;
  DtoEdited = new ProjektDto();
  @Input() set DtoOriginal(value: ProjektDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventOk = new EventEmitter<ProjektDto>();
  @Output() eventCancel = new EventEmitter<void>();

  form: FormGroup;
  projektservice: ProjektService;

  constructor(private _fb: FormBuilder,
              projektservice: ProjektService) {
    this.projektservice = projektservice;

    this.form = this._fb.group({
      'muszakiallapot': [''],
      'inverter': [''],
      'ackva': [0, [Validators.required]],
      'inverterstatusz': [''],
      'napelem': [''],
      'dckw': [0, [Validators.required]],
      'napelemstatusz': [''],
    });
  }

  ngOnInit() {
    this.updateform();
  }

  updateform() {
    this.form.controls['muszakiallapot'].setValue(this.DtoEdited.Muszakiallapot);
    this.form.controls['inverter'].setValue(this.DtoEdited.Inverter);
    this.form.controls['ackva'].setValue(this.DtoEdited.Ackva);
    this.form.controls['inverterstatusz'].setValue(this.DtoEdited.Inverterallapot);
    this.form.controls['napelem'].setValue(this.DtoEdited.Napelem);
    this.form.controls['dckw'].setValue(this.DtoEdited.Dckw);
    this.form.controls['napelemstatusz'].setValue(this.DtoEdited.Napelemallapot);
  }
  updatedto() {
    this.DtoEdited.Muszakiallapot = this.form.value['muszakiallapot'];
    this.DtoEdited.Inverter = this.form.value['inverter'];
    this.DtoEdited.Ackva = this.form.value['ackva'];
    this.DtoEdited.Inverterallapot = this.form.value['inverterstatusz'];
    this.DtoEdited.Napelem = this.form.value['napelem'];
    this.DtoEdited.Dckw = this.form.value['dckw'];
    this.DtoEdited.Napelemallapot = this.form.value['napelemstatusz'];
  }

  onSubmit() {
    this.updatedto();
    this.eventOk.emit(this.DtoEdited);
  }

  cancel() {
    this.eventCancel.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
