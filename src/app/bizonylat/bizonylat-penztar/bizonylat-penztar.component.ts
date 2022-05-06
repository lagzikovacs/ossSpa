import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BizonylatService} from '../../03 Bizonylatok/bizonylat/bizonylat.service';
import {PenztartetelService} from '../../02 Eszkozok/03 Penztar/penztartetel/penztartetel.service';
import {PenztartetelDto} from '../../02 Eszkozok/03 Penztar/penztartetel/penztarteteldto';
import {BizonylatTipus} from '../../03 Bizonylatok/bizonylat/bizonylattipus';
import {ErrorService} from '../../common/errorbox/error.service';
import {deepCopy} from '../../common/deepCopy';
import {BizonylatDto} from '../../03 Bizonylatok/bizonylat/bizonylatdto';
import {PenztarDto} from '../../02 Eszkozok/03 Penztar/penztar/penztardto';
import {PenztarService} from '../../02 Eszkozok/03 Penztar/penztar/penztar.service';
import {BizonylatTipusLeiro} from '../../03 Bizonylatok/bizonylat/bizonylattipusleiro';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-bizonylat-penztar',
  templateUrl: './bizonylat-penztar.component.html'
})
export class BizonylatPenztarComponent implements OnInit, OnDestroy {
  Dto = new BizonylatDto();
  @Input() set DtoOriginal(value: BizonylatDto) {
    this.Dto = deepCopy(value);
  }
  @Input() bizonylatTipus = BizonylatTipus.Szamla;
  @Input() bizonylatLeiro = new BizonylatTipusLeiro();
  @Output() eventPenztarUtan = new EventEmitter<void>();

  penztarDto = new Array<PenztarDto>();

  penztarindex = -1;
  penztarkivalasztva = false;
  megjegyzes = '';

  form: FormGroup;
  eppFrissit = false;

  bizonylatservice: BizonylatService;

  constructor(private _penztarservice: PenztarService,
              private _penztartetelservice: PenztartetelService,
              private _errorservice: ErrorService,
              private _fb: FormBuilder,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;

    this.form = this._fb.group({
      'penztar': [{value: '', disabled: true}, []],
      'penznem': [{value: '', disabled: true}, []],
      'egyenleg': [{value: 0, disabled: true}, []],
      'osszeg': [{value: 0, disabled: true}, []],
      'megjegyzes': ['', []],
    });
  }

  ngOnInit() {
    this.eppFrissit = true;
    this._penztarservice.ReadByCurrencyOpened(this.Dto.Penznemkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.penztarDto = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  penztarvalasztas(i: number) {
    this.penztarindex = i;
    this.penztarkivalasztva = true;
    this.updateform();
  }

  updateform() {
    this.form.controls['penztar'].setValue(this.penztarDto[this.penztarindex].Penztar1);
    this.form.controls['penznem'].setValue(this.penztarDto[this.penztarindex].Penznem);
    this.form.controls['egyenleg'].setValue(this.penztarDto[this.penztarindex].Egyenleg);
    this.form.controls['osszeg'].setValue(this.Dto.Brutto);
  }
  updatedto() {
    this.megjegyzes = this.form.value['megjegyzes'];
  }

  onSubmit() {
    let penztartetelDto: PenztartetelDto;

    this.eppFrissit = true;
    this.updatedto();

    this._penztartetelservice.CreateNew()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        penztartetelDto = res.Result[0];

        penztartetelDto.Penztarkod = this.penztarDto[this.penztarindex].Penztarkod;
        penztartetelDto.Datum = this.Dto.Bizonylatkelte;
        penztartetelDto.Jogcim = this.bizonylatTipus === BizonylatTipus.BejovoSzamla ? 'Bejövő számla' : 'Számla';
        penztartetelDto.Ugyfelnev = this.Dto.Ugyfelnev;
        penztartetelDto.Bizonylatszam = this.Dto.Bizonylatszam;
        if (this.bizonylatTipus === BizonylatTipus.BejovoSzamla) {
          penztartetelDto.Kiadas = this.Dto.Brutto;
        } else {
          penztartetelDto.Bevetel = this.Dto.Brutto;
        }
        penztartetelDto.Megjegyzes = this.megjegyzes;

        return this._penztartetelservice.Add(penztartetelDto);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.eppFrissit = false;
        this.eventPenztarUtan.emit();

      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  cancel() {
    this.eventPenztarUtan.emit();
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
