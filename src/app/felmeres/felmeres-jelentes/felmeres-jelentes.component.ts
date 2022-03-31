import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {FelmeresService} from '../felmeres.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {FelmeresDto} from '../felmeresdto';
import {deepCopy} from '../../tools/deepCopy';

@Component({
  selector: 'app-felmeres-jelentes',
  templateUrl: './felmeres-jelentes.component.html'
})
export class FelmeresJelentesComponent  implements OnInit, OnDestroy {
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

    this.felmeresservice.Update(this.DtoEdited)
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

  onCancel() {
    this.eventSzerkeszteskesz.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
