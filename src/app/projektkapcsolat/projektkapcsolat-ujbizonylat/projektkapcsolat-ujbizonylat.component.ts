import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import {ProjektKapcsolatParameter} from '../projektkapcsolatparameter';
import {UgyfelDto} from '../../ugyfel/ugyfeldto';
import {ErrorService} from '../../tools/errorbox/error.service';
import {ProjektKapcsolatDto} from '../projektkapcsolatdto';
import {LogonService} from '../../logon/logon.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-projektkapcsolat-ujbizonylat',
  templateUrl: './projektkapcsolat-ujbizonylat.component.html'
})
export class ProjektkapcsolatUjbizonylatComponent implements OnInit, OnDestroy {
  @Input() Projektkod = -1;
  @Input() Ugyfelkod = -1;
  @Output() eventUjbizonylatutan = new EventEmitter<ProjektKapcsolatDto>();

  entryindex = 3;

  form: FormGroup;
  eppFrissit = false;

  projektkapcsolatservice: ProjektkapcsolatService;
  bizonylatservice: BizonylatService;

  constructor(private _ugyfelservice: UgyfelService,
              private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              projektkapcsolatservice: ProjektkapcsolatService,
              bizonylatservice: BizonylatService) {
    this.projektkapcsolatservice = projektkapcsolatservice;
    this.bizonylatservice = bizonylatservice;

    this.form = this._fb.group({
      'bizonylattipus': [0, [Validators.required]],
    });
  }

  ngOnInit() {
    for (let i = 0; i < this.bizonylatservice.tipusok.length; i++) {
      this.bizonylatservice.tipusok[i][2] = !this._logonservice.Jogaim.includes(this.bizonylatservice.tipusok[i][3]);
    }

    this.updateform();
  }

  updateform() {
    this.form.controls['bizonylattipus'].setValue(this.entryindex);
  }
  updatedto() {
    this.entryindex = this.form.value['bizonylattipus'];
  }

  onSubmit() {
    let bizonylatDto: any;
    let ugyfelDto: UgyfelDto;

    this.eppFrissit = true;
    this.updatedto();
    this.bizonylatservice.CreateNewComplex()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        bizonylatDto = res.Result[0].Dto;
        return this._ugyfelservice.Get(this.Ugyfelkod);
      })
      .then(res1 => {
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

        return this.projektkapcsolatservice.UjBizonylatToProjekt(new ProjektKapcsolatParameter(
          this.Projektkod,
          0,
          0,
          bizonylatDto
        ));
      })
      .then(res2 => {
        if (res2.Error != null) {
          throw res2.Error;
        }

        return this.projektkapcsolatservice.Get(res2.Result);
      })
      .then(res3 => {
        if (res3.Error != null) {
          throw res3.Error;
        }

        this.eppFrissit = false;
        this.eventUjbizonylatutan.emit(res3.Result[0]);
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  cancel() {
    this.eventUjbizonylatutan.emit(null);
  }


  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
