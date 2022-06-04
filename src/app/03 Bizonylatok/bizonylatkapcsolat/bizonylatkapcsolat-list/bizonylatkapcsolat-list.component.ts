import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';
import {IratService} from '../../../02 Eszkozok/02 Irat/irat/irat.service';
import {VagolapService} from '../../../05 Segedeszkozok/08 Vagolap/vagolap.service';
import {VagolapMode} from '../../../05 Segedeszkozok/08 Vagolap/vagolapmode';
import {ErrorService} from '../../../common/errorbox/error.service';
import {IratDto} from '../../../02 Eszkozok/02 Irat/irat/iratdto';
import {BizonylatkapcsolatTablaComponent} from '../bizonylatkapcsolat-tabla/bizonylatkapcsolat-tabla.component';
import {BizonylatKapcsolatDto} from '../bizonylatkapcsolatdto';
import {BizonylatkapcsolatEgyMode} from '../bizonylatkapcsolategymode';
import {propCopy} from '../../../common/propCopy';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {BizonylatKapcsolatParam} from '../bizonylatkapcsolatparam';
import {IratSzerkesztesComponent} from '../../../02 Eszkozok/02 Irat/irat/irat-szerkesztes/irat-szerkesztes.component';
import {BizonylatkapcsolatVagolaprolComponent} from '../bizonylatkapcsolat-vagolaprol/bizonylatkapcsolat-vagolaprol.component';
import {BizonylatService} from '../../bizonylat/bizonylat.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylatkapcsolat-list',
  templateUrl: './bizonylatkapcsolat-list.component.html'
})
export class BizonylatkapcsolatListComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: BizonylatkapcsolatTablaComponent;
  @ViewChild('compcont_bizonylatkapcsolatuj', {read: ViewContainerRef}) vcruj: ViewContainerRef;

  @Input() Bizonylatkod = -1;
  @Input() Ugyfelkod = -1;

  OriginalIrat = new IratDto();

  Dto = new Array<BizonylatKapcsolatDto>();
  DtoSelectedIndex = -1;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  egymode = 0;

  bizonylatkapcsolatservice: BizonylatkapcsolatService;

  constructor(private _iratservice: IratService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              private _bizonylatservice: BizonylatService,
              bizonylatkapcsolatservice: BizonylatkapcsolatService) {
    super();

    this.bizonylatkapcsolatservice = bizonylatkapcsolatservice;
  }

  ngAfterViewInit() {
    this.onKereses();
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  async onKereses() {
    this.vcruj.clear();
    this.tabla.clearselections();

    this.spinner = true;
    try {
      const res = await this.bizonylatkapcsolatservice.Select(this.Bizonylatkod);
      if (res.Error != null) {
        throw res.Error;
      }

      this.Dto = res.Result;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  async doUj() {
    this.vcruj.clear();
    this.tabla.clearselections();

    this.spinner = true;
    try {
      const resP1 = await this._bizonylatservice.Get(this.Bizonylatkod);
      if (resP1.Error != null) {
        throw resP1.Error;
      }
      const ugyfelkod1 = resP1.Result[0].Ugyfelkod;
      this.spinner = false;

      const ujiC = this.vcruj.createComponent(IratSzerkesztesComponent);
      ujiC.instance.uj = true;
      ujiC.instance.enUgyfel = false;
      ujiC.instance.Ugyfelkod = ugyfelkod1;
      ujiC.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(async dtoIrat => {
        this.spinner = true;

        const resBkk = await this.bizonylatkapcsolatservice.AddIratToBizonylat(new BizonylatKapcsolatParam(
          this.Bizonylatkod, dtoIrat.Iratkod));
        if (resBkk.Error != null) {
          throw resBkk.Error;
        }

        const resBk = await this.bizonylatkapcsolatservice.Get(resBkk.Result);
        if (resBk.Error != null) {
          throw resBk.Error;
        }

        this.spinner = false;
        this.vcruj.clear();

        const buf = [...this.Dto];
        buf.unshift(resBk.Result[0]);
        this.Dto = buf;

        this.docdr();
      });
      ujiC.instance.eventMegsem.pipe(untilComponentDestroyed(this)).subscribe(dto => {
        this.vcruj.clear();
      });

      this.docdr();
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
      this.vcruj.clear();
    }
  }

  doVagolaprol() {
    this.vcruj.clear();
    this.tabla.clearselections();

    this._vagolapservice.Mode = VagolapMode.Bizonylatirat;

    const vagolaprolC = this.vcruj.createComponent(BizonylatkapcsolatVagolaprolComponent);

    vagolaprolC.instance.Bizonylatkod = this.Bizonylatkod;
    vagolaprolC.instance.eventEgytetel.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.vcruj.clear();

      const buf = [...this.Dto];
      buf.unshift(dto);
      this.Dto = buf;

      this.docdr();
    });
    vagolaprolC.instance.eventVege.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcruj.clear();
    });
    vagolaprolC.instance.eventMegsem.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.vcruj.clear();
    });

    this.docdr();
  }

  onId(i: number) {
    this.vcruj.clear();

    this.DtoSelectedIndex = i;
    if (this.DtoSelectedIndex === -1) {
      return;
    }

    this.egymode = BizonylatkapcsolatEgyMode.Egyirat;
    this.tabla.egytetelstart();
  }

  onModositasutan(dto: BizonylatKapcsolatDto) {
    propCopy(dto, this.Dto[this.DtoSelectedIndex]);
  }

  onLevalasztasutan() {
    this.Dto.splice(this.DtoSelectedIndex, 1);
    this.DtoSelectedIndex = -1;

    this.tabla.clearselections();
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
