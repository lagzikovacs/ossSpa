import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output
} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {BizonylatService} from '../../../../03 Bizonylatok/bizonylat/bizonylat.service';
import {UgyfelService} from '../../../../01 Torzsadatok/09 Ugyfel/ugyfel.service';
import {ProjektKapcsolatParam} from '../projektkapcsolatparam';
import {UgyfelDto} from '../../../../01 Torzsadatok/09 Ugyfel/ugyfeldto';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {ProjektKapcsolatDto} from '../projektkapcsolatdto';
import {LogonService} from '../../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projektkapcsolat-ujbizonylat',
  templateUrl: './projektkapcsolat-ujbizonylat.component.html'
})
export class ProjektkapcsolatUjbizonylatComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() Projektkod = -1;
  @Input() Ugyfelkod = -1;
  @Output() eventOk = new EventEmitter<ProjektKapcsolatDto>();
  @Output() eventMegsem = new EventEmitter<void>();

  entryindex = 3;

  form: FormGroup;
  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  projektkapcsolatservice: ProjektkapcsolatService;
  bizonylatservice: BizonylatService;

  constructor(private _ugyfelservice: UgyfelService,
              private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              private _cdr: ChangeDetectorRef,
              projektkapcsolatservice: ProjektkapcsolatService,
              bizonylatservice: BizonylatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    for (let i = 0; i < this.bizonylatservice.tipusok.length; i++) {
      this.bizonylatservice.tipusok[i][2] = !this._logonservice.Jogaim.includes(this.bizonylatservice.tipusok[i][3]);
    }

    this.form = this._fb.group({
      'bizonylattipus': [0, [Validators.required]],
    });
  }

  ngAfterViewInit() {
    this.updateform();
    this.docdr();
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  updateform() {
    this.form.controls['bizonylattipus'].setValue(this.entryindex);
  }
  updatedto() {
    this.entryindex = this.form.value['bizonylattipus'];
  }

  async onSubmit() {
    let bizonylatDto: any;
    let ugyfelDto: UgyfelDto;

    this.updatedto();

    this.spinner = true;
    try {
      const res = await this.bizonylatservice.CreateNewComplex();
      if (res.Error != null) {
        throw res.Error;
      }

      bizonylatDto = res.Result[0].Dto;

      const res1 = await this._ugyfelservice.Get(this.Ugyfelkod);
      if (res1.Error != null) {
        throw res1.Error;
      }

      ugyfelDto = res1.Result[0];

      bizonylatDto.Bizonylattipuskod = this.bizonylatservice.tipusok[this.entryindex][1];
      bizonylatDto.Ugyfelkod = ugyfelDto.Ugyfelkod;
      bizonylatDto.Ugyfelnev = ugyfelDto.Nev;
      bizonylatDto.Ugyfeladoszam = ugyfelDto.Adoszam;

      bizonylatDto.Ugyfeliranyitoszam = ugyfelDto.Iranyitoszam;
      bizonylatDto.Ugyfelhelysegkod = ugyfelDto.Helysegkod;
      bizonylatDto.Ugyfelhelysegnev = ugyfelDto.Helysegnev;
      bizonylatDto.Ugyfelkozterulet = ugyfelDto.Kozterulet;
      bizonylatDto.Ugyfelkozterulettipus = ugyfelDto.Kozterulettipus;
      bizonylatDto.Ugyfelhazszam = ugyfelDto.Hazszam;

      const res2 = await this.projektkapcsolatservice.UjBizonylatToProjekt(new ProjektKapcsolatParam(
        this.Projektkod, 0, 0, bizonylatDto));
      if (res2.Error != null) {
        throw res2.Error;
      }

      const res3 = await this.projektkapcsolatservice.Get(res2.Result);
      if (res3.Error != null) {
        throw res3.Error;
      }

      this.spinner = false;
      this.eventOk.emit(res3.Result[0]);
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onCancel() {
    this.eventMegsem.emit(null);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
