import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {rowanimation} from '../../animation/rowAnimation';
import {deepCopy} from '../../common/deepCopy';
import {ProjektDto} from '../projektdto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-projekt-statusz',
  templateUrl: './projekt-statusz.component.html',
  animations: [rowanimation]
})
export class ProjektStatuszComponent implements OnInit, OnDestroy {
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
      'statusz': [0, [Validators.required]],
    });
  }

  ngOnInit() {
    this.updateform();
  }

  updateform() {
    this.form.controls['statusz'].setValue(this.DtoEdited.Statusz);
  }
  updatedto() {
    this.DtoEdited.Statusz = this.form.value['statusz'];
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
