import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {TermekdijService} from '../../../01 Torzsadatok/051 Termekdij/termekdij.service';
import {NumberResult} from '../../../common/dtos/numberresult';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {TermekdijDto} from '../../../01 Torzsadatok/051 Termekdij/termekdijdto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-termekdij-szerkesztes',
  templateUrl: './termekdij-szerkesztes.component.html'
})
export class TermekdijSzerkesztesComponent implements OnInit, OnDestroy {
  @Input() uj = false;
  DtoEdited = new TermekdijDto();
  @Input() set DtoOriginal(value: TermekdijDto) {
    this.DtoEdited = deepCopy(value);
  }
  @Output() eventSzerkeszteskesz = new EventEmitter<TermekdijDto>();

  form: FormGroup;
  eppFrissit = false;

  termekdijservice: TermekdijService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              termekdijservice: TermekdijService) {
    this.termekdijservice = termekdijservice;

    this.form = this._fb.group({
      'kt': ['', [Validators.required, Validators.maxLength(30)]],
      'megnevezes': ['', [Validators.required, Validators.maxLength(50)]],
      'egysegar': [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    if (this.uj) {
      this.eppFrissit = true;
      this.termekdijservice.CreateNew()
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
    this.form.controls['kt'].setValue(this.DtoEdited.Termekdijkt);
    this.form.controls['megnevezes'].setValue(this.DtoEdited.Termekdijmegnevezes);
    this.form.controls['egysegar'].setValue(this.DtoEdited.Termekdijegysegar);
  }
  updatedto() {
    this.DtoEdited.Termekdijkt = this.form.value['kt'];
    this.DtoEdited.Termekdijmegnevezes = this.form.value['megnevezes'];
    this.DtoEdited.Termekdijegysegar = this.form.value['egysegar'];
  }

  onSubmit() {
    this.eppFrissit = true;
    let p: Promise<NumberResult>;
    this.updatedto();

    if (this.uj) {
      p = this.termekdijservice.Add(this.DtoEdited);
    } else {
      p = this.termekdijservice.Update(this.DtoEdited);
    }

    p
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.termekdijservice.Get(res.Result);
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
