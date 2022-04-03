import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ParticioDto} from '../../05 Segedeszkozok/01 Particio/particiodto';
import {SzallitoConf} from '../../05 Segedeszkozok/01 Particio/szallitoconf';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-particio-kibocsato',
  templateUrl: './particio-kibocsato.component.html'
})
export class ParticioSzallitoComponent implements OnInit, OnDestroy {
  @Input() Dto: ParticioDto;
  @Output() eventOk = new EventEmitter<ParticioDto>();
  @Output() eventCancel = new EventEmitter<void>();

  form: FormGroup;
  cSzallito: SzallitoConf;

  constructor(private _fb: FormBuilder) {

    this.form = this._fb.group({
      'nev': ['', [Validators.required]],
      'iranyitoszam': ['', [Validators.required]],
      'helysegnev': ['', [Validators.required]],
      'utcahazszam': ['', [Validators.required]],
      'bankszamla1': ['', [Validators.required]],
      'bankszamla2': ['', [Validators.required]],
      'adotorzsszam': ['', [Validators.required]],
      'adoafakod': ['', [Validators.required]],
      'adomegyekod': ['', [Validators.required]],
    });
  }

  ngOnInit() {
    try {
      this.cSzallito = JSON.parse(this.Dto.Szallito); // kivétel, ha hibás
      if (this.cSzallito === null) { // null, ha a mező is null
        throw new Error();
      }
    } catch (ex) {
      this.cSzallito = new SzallitoConf();
    }

    this.updateform();
  }

  updateform() {
    this.form.controls['nev'].setValue(this.cSzallito.Nev);
    this.form.controls['iranyitoszam'].setValue(this.cSzallito.Iranyitoszam);
    this.form.controls['helysegnev'].setValue(this.cSzallito.Helysegnev);
    this.form.controls['utcahazszam'].setValue(this.cSzallito.Utcahazszam);
    this.form.controls['bankszamla1'].setValue(this.cSzallito.Bankszamla1);
    this.form.controls['bankszamla2'].setValue(this.cSzallito.Bankszamla2);
    this.form.controls['adotorzsszam'].setValue(this.cSzallito.Adotorzsszam);
    this.form.controls['adoafakod'].setValue(this.cSzallito.Adoafakod);
    this.form.controls['adomegyekod'].setValue(this.cSzallito.Adomegyekod);
  }
  updateconf() {
    this.cSzallito.Nev = this.form.value['nev'];
    this.cSzallito.Iranyitoszam = this.form.value['iranyitoszam'];
    this.cSzallito.Helysegnev = this.form.value['helysegnev'];
    this.cSzallito.Utcahazszam = this.form.value['utcahazszam'];
    this.cSzallito.Bankszamla1 = this.form.value['bankszamla1'];
    this.cSzallito.Bankszamla2 = this.form.value['bankszamla2'];
    this.cSzallito.Adotorzsszam = this.form.value['adotorzsszam'];
    this.cSzallito.Adoafakod = this.form.value['adoafakod'];
    this.cSzallito.Adomegyekod = this.form.value['adomegyekod'];
  }

  onSubmit() {
    this.updateconf();
    this.Dto.Szallito = JSON.stringify(this.cSzallito);

    this.eventOk.emit(this.Dto);
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
