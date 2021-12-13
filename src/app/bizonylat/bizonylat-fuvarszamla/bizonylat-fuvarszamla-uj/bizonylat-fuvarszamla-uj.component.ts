import {Component, OnDestroy, Output, EventEmitter, Input, OnInit} from '@angular/core';
import {BizonylatService} from '../../bizonylat.service';
import {ErrorService} from '../../../tools/errorbox/error.service';
import {BizonylatDto} from '../../bizonylatdto';
import {BizonylatZoomParameter} from '../../bizonylatzoomparameter';
import {FuvardijParam} from '../../fuvardijparam';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-bizonylat-fuvarszamla-uj',
  templateUrl: './bizonylat-fuvarszamla-uj.component.html'
})
export class BizonylatFuvarszamlaUjComponent implements OnInit, OnDestroy {
  @Input() dtoAnyagszamla: BizonylatDto;
  dtoFuvarszamla = new BizonylatDto();
  @Output() eventMegsem = new EventEmitter();
  @Output() eventOK = new EventEmitter<BizonylatDto>();

  form: FormGroup;
  eppFrissit = false;

  Fuvardij: number;

  SzerkesztesMode = 0;

  fuvarszamlazoombox: any;

  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              private _fb: FormBuilder,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;

    this.form = this._fb.group({
      'bizonylatszam': ['', [Validators.required, Validators.maxLength(100)]],
      'fuvardij': [0, [Validators.required]],
      'fuvardijpenzneme': [{value: '', disabled: true}, [Validators.required, Validators.maxLength(3)]],
      'fuvardijarfolyama': [{value: 0, disabled: true}, [Validators.required]],
    });
  }

  ngOnInit() {
    this.fuvarszamlazoombox = document.getElementById('fuvarszamlazoombox');
    this.updateform();
  }

  updateform() {
    this.form.controls['bizonylatszam'].setValue(this.dtoFuvarszamla.Bizonylatszam);
    this.form.controls['fuvardij'].setValue(this.Fuvardij);
    this.form.controls['fuvardijpenzneme'].setValue(this.dtoFuvarszamla.Penznem);
    this.form.controls['fuvardijarfolyama'].setValue(this.dtoFuvarszamla.Arfolyam);
  }
  updatedto() {
    this.dtoFuvarszamla.Bizonylatszam = this.form.value['bizonylatszam'];
    this.Fuvardij = this.form.value['fuvardij'];
    this.dtoFuvarszamla.Penznem = this.form.value['fuvardijpenzneme'];
    this.dtoFuvarszamla.Arfolyam = this.form.value['fuvardijarfolyama'];
  }

  onSubmit() {
    this.eppFrissit = true;
    this.updatedto();

    this.bizonylatservice.ZoomCheck(new BizonylatZoomParameter(this.dtoFuvarszamla.Bizonylatkod || 0,
      this.dtoFuvarszamla.Bizonylatszam || ''))
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        return this.bizonylatservice.Fuvardij(new FuvardijParam(this.dtoAnyagszamla, this.dtoFuvarszamla, this.Fuvardij));
      })
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.bizonylatservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        this.eppFrissit = false;
        this.eventOK.emit(res2.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  doCancel() {
    this.eventMegsem.emit();
  }

  BizonylatZoom() {
    this.updatedto();
    this.SzerkesztesMode = 1;
    this.fuvarszamlazoombox.style.display = 'block';
  }
  eventSelectzoom(Dto: BizonylatDto) {
    this.dtoFuvarszamla = Dto;
    this.Fuvardij = Dto.Netto;
    this.updateform();
  }
  eventStopZoom() {
    this.SzerkesztesMode = 0;
    this.fuvarszamlazoombox.style.display = 'none';
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
