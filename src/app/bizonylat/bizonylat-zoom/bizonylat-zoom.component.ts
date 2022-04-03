import {Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {BizonylatDto} from '../bizonylatdto';
import {environment} from '../../../environments/environment';
import {BizonylatParameter} from '../bizonylatparameter';
import {BizonylatTipus} from '../bizonylattipus';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {BizonylatService} from '../bizonylat.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {Szempont} from '../../common/enums/szempont';
import {SzMT} from '../../common/dtos/szmt';

@Component({
  selector: 'app-bizonylat-zoom',
  templateUrl: './bizonylat-zoom.component.html'
})
export class BizonylatZoomComponent implements OnInit, OnDestroy {
  @ViewChild('Minta', {static: true}) MintaTextBox: ElementRef;
  @Input() maszk = '';
  @Output() eventSelectzoom = new EventEmitter<BizonylatDto>();
  @Output() eventStopzoom = new EventEmitter<void>();
  clickedrowindex = -1;

  bizonylatTipus = BizonylatTipus.BejovoSzamla;
  bizonylatLeiro = new BizonylatTipusLeiro();
  bp = new BizonylatParameter(0, environment.lapmeret);
  items = new Array<BizonylatDto>();
  OsszesRekord = 0;
  elsokereses = true;
  eppFrissit = false;

  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  ngOnInit() {
    this.MintaTextBox.nativeElement.value = this.maszk;

    this.eppFrissit = true;
    this.bizonylatservice.BizonylatLeiro(this.bizonylatTipus)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatLeiro = res.Result;
        this.eppFrissit = false;

        this.doKereses();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  doKereses() {
    this.elsokereses = true;

    this.bp.rekordtol = 0;
    this.bp.fi = new Array();
    this.bp.BizonylatTipus = this.bizonylatTipus;
    this.bp.fi.push(new SzMT(Szempont.Bizonylatszam, this.maszk));

    this.clickedrowindex = -1;

    this.doKeresesTovabb();
  }

  doKeresesTovabb() {
    this.eppFrissit = true;
    this.bizonylatservice.Select(this.bp)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.items = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.items];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.items = buf;
        }
        this.OsszesRekord = res.OsszesRekord;

        this.bp.rekordtol += this.bp.lapmeret;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onStartzoom(i: number) {
    this.eventSelectzoom.emit(this.items[i]);

    this.onStopZoom();
  }

  onStopZoom() {
    this.eventStopzoom.emit();
  }

  clickforrow(i: number) {
    this.clickedrowindex = i;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
