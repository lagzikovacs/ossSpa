import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {PenztartetelService} from '../../penztartetel/penztartetel.service';
import {PenztartetelDto} from '../../penztartetel/penztarteteldto';
import {BizonylatTipus} from '../bizonylattipus';
import {ErrorService} from '../../tools/errorbox/error.service';
import {deepCopy} from '../../tools/deepCopy';
import {BizonylatDto} from '../bizonylatdto';
import {PenztarDto} from '../../penztar/penztardto';
import {PenztarService} from '../../penztar/penztar.service';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';

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

  eppFrissit = false;

  bizonylatservice: BizonylatService;

  constructor(private _penztarservice: PenztarService,
              private _penztartetelservice: PenztartetelService,
              private _errorservice: ErrorService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
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
  }

  onSubmit() {
    let penztartetelDto: PenztartetelDto;

    this.eppFrissit = true;
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
