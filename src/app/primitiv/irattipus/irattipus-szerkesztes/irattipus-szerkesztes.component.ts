import {IrattipusService} from '../../../01 Torzsadatok/01 Irattipus/irattipus.service';
import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {NumberResult} from '../../../common/dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {deepCopy} from '../../../tools/deepCopy';
import {IrattipusDto} from '../../../01 Torzsadatok/01 Irattipus/irattipusdto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-irattipus-szerkesztes',
  templateUrl: './irattipus-szerkesztes.component.html'
})
export class IrattipusSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new IrattipusDto();
  @Input() set DtoOriginal(value: IrattipusDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<IrattipusDto>();

  form: FormGroup;
  eppFrissit = false;

  irattipusservice: IrattipusService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              irattipusservice: IrattipusService) {
    this.irattipusservice = irattipusservice;

    this.form = this._fb.group({
      'irattipus': ['', [Validators.required, Validators.maxLength(30)]]
    });
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.irattipusservice.CreateNew()
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
    this.form.controls['irattipus'].setValue(this.DtoEdited.Irattipus1);
  }
  updatedto() {
    this.DtoEdited.Irattipus1 = this.form.value['irattipus'];
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;
    this.updatedto();

    if (this.uj) {
      p = this.irattipusservice.Add(this.DtoEdited);
    } else {
      p = this.irattipusservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.irattipusservice.Get(res.Result);
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
