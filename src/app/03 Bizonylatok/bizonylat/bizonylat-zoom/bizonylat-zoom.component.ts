import {
  Component, ElementRef, Input, OnDestroy, OnInit, Output, ViewChild, EventEmitter,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {BizonylatDto} from '../bizonylatdto';
import {environment} from '../../../../environments/environment';
import {BizonylatParameter} from '../bizonylatparameter';
import {BizonylatTipus} from '../bizonylattipus';
import {BizonylatTipusLeiro} from '../bizonylattipusleiro';
import {BizonylatService} from '../bizonylat.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {Szempont} from '../../../common/enums/szempont';
import {SzMT} from '../../../common/dtos/szmt';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  bizonylatservice: BizonylatService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  async ngOnInit() {
    this.MintaTextBox.nativeElement.value = this.maszk;

    this.spinner = true;
    try {
      const res = await this.bizonylatservice.BizonylatLeiro(this.bizonylatTipus);
      if (res.Error != null) {
        throw res.Error;
      }

      this.bizonylatLeiro = res.Result;
      this.spinner = false;

      this.doKereses();
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
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

  async doKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.bizonylatservice.Select(this.bp);
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
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
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
