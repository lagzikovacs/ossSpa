import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HibabejelentesService} from '../hibabejelentes.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {HibabejelentesDto} from '../hibabejelentesdto';
import {deepCopy} from '../../common/deepCopy';

@Component({
  selector: 'app-hibabejelentes-jelentes',
  templateUrl: './hibabejelentes-jelentes.component.html'
})
export class HibabejelentesJelentesComponent implements OnInit, OnDestroy {
  DtoEdited = new HibabejelentesDto();
  @Input() set DtoOriginal(value: HibabejelentesDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<HibabejelentesDto>();

  form: FormGroup;
  eppFrissit = false;

  hibabejelentesservice: HibabejelentesService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              hibabejelentesservice: HibabejelentesService) {
    this.hibabejelentesservice = hibabejelentesservice;

    this.form = this._fb.group({
      'megjegyzes1': ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.updateform();
  }

  updateform() {
    this.form.controls['megjegyzes1'].setValue(this.DtoEdited.Megjegyzes1);
  }
  updatedto() {
    this.DtoEdited.Megjegyzes1 = this.form.value['megjegyzes1'];
  }

  onSubmit() {
    this.eppFrissit = true;
    this.updatedto();

    this.hibabejelentesservice.Update(this.DtoEdited)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.hibabejelentesservice.Get(res.Result);
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
