import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {TermekdijService} from '../termekdij.service';
import {NumberResult} from '../../../common/dtos/numberresult';
import {ErrorService} from '../../../common/errorbox/error.service';
import {deepCopy} from '../../../common/deepCopy';
import {TermekdijDto} from '../termekdijdto';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  termekdijservice: TermekdijService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              termekdijservice: TermekdijService) {
    this.termekdijservice = termekdijservice;

    this.form = this._fb.group({
      'kt': ['', [Validators.required, Validators.maxLength(30)]],
      'megnevezes': ['', [Validators.required, Validators.maxLength(50)]],
      'egysegar': [0, [Validators.required, Validators.min(0)]]
    });
  }

  async ngOnInit() {
    if (this.uj) {
      this.spinner = true;
      try {
        const res = await this.termekdijservice.CreateNew();
        if (res.Error !== null) {
          throw res.Error;
        }

        this.DtoEdited = res.Result[0];
        this.spinner = false;
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    }

    this.updateform();
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

  async onSubmit() {
    this.updatedto();

    this.spinner = true;
    try {
      let res: NumberResult;
      if (this.uj) {
        res = await this.termekdijservice.Add(this.DtoEdited);
      } else {
        res = await this.termekdijservice.Update(this.DtoEdited);
      }
      if (res.Error != null) {
        throw res.Error;
      }

      const res1 = await this.termekdijservice.Get(res.Result);
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
    this.eventSzerkeszteskesz.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
