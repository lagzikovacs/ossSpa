import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {LogonService} from '../../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {VagolapService} from '../../../../05 Segedeszkozok/08 Vagolap/vagolap.service';
import {VagolapMode} from '../../../../05 Segedeszkozok/08 Vagolap/vagolapmode';
import {JogKod} from '../../../../common/enums/jogkod';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {ProjektkapcsolatTablaComponent} from '../projektkapcsolat-tabla/projektkapcsolat-tabla.component';
import {IratDto} from '../../../02 Irat/irat/iratdto';
import {BizonylatDto} from '../../../../03 Bizonylatok/bizonylat/bizonylatdto';
import {ProjektKapcsolatDto} from '../projektkapcsolatdto';
import {BizonylatTipusLeiro} from '../../../../03 Bizonylatok/bizonylat/bizonylattipusleiro';
import {BizonylatTipus} from '../../../../03 Bizonylatok/bizonylat/bizonylattipus';
import {ProjektkapcsolatEgyMode} from '../projektkapcsolategymode';
import {propCopy} from '../../../../common/propCopy';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {ProjektkapcsolatUjbizonylatComponent} from '../projektkapcsolat-ujbizonylat/projektkapcsolat-ujbizonylat.component';
import {ProjektService} from '../../projekt/projekt.service';
import {ProjektKapcsolatParam} from '../projektkapcsolatparam';
import {IratSzerkesztesComponent} from '../../../02 Irat/irat/irat-szerkesztes/irat-szerkesztes.component';
import {AjanlatComponent} from '../../ajanlat/ajanlat/ajanlat';
import {ProjektkapcsolatVagolaprolComponent} from '../projektkapcsolat-vagolaprol/projektkapcsolat-vagolaprol.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projektkapcsolat-list',
  templateUrl: './projektkapcsolat-list.component.html'
})
export class ProjektkapcsolatListComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: ProjektkapcsolatTablaComponent;
  @ViewChild('compcont_projektkapcsolatuj', {read: ViewContainerRef}) vcruj: ViewContainerRef;

  @Input() Projektkod = -1;
  @Input() Ugyfelkod = -1;

  Dto = new Array<ProjektKapcsolatDto>();
  DtoSelectedIndex = -1;

  OriginalIrat = new IratDto();
  OriginalBizonylat = new BizonylatDto();
  bizonylatLeiro = new BizonylatTipusLeiro();
  bizonylatTipus = BizonylatTipus.Szamla;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  bizonylatjog = false;
  iratjog = false;
  ajanlatjog = false;

  egymode = 0;

  projektkapcsolatservice: ProjektkapcsolatService;

  constructor(private _logonservice: LogonService,
              private _vagolapservice: VagolapService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              private _projektservice: ProjektService,
              projektkapcsolatservice: ProjektkapcsolatService) {
    super();

    this.bizonylatjog = this._logonservice.Jogaim.includes(JogKod[JogKod.BIZONYLATMOD]);
    this.iratjog = this._logonservice.Jogaim.includes(JogKod[JogKod.IRATMOD]);
    this.ajanlatjog = this._logonservice.Jogaim.includes(JogKod[JogKod.AJANLATKESZITES]);

    this.projektkapcsolatservice = projektkapcsolatservice;
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
      const res = await this.projektkapcsolatservice.Select(this.Projektkod);
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

  async doUjbizonylat() {
    this.vcruj.clear();
    this.tabla.clearselections();

    this.spinner = true;
    try {
      const resP = await this._projektservice.Get(this.Projektkod);
      if (resP.Error != null) {
        throw resP.Error;
      }
      const Ugyfelkod = resP.Result[0].Ugyfelkod;
      this.spinner = false;

      const ujbC = this.vcruj.createComponent(ProjektkapcsolatUjbizonylatComponent);
      ujbC.instance.Projektkod = this.Projektkod;
      ujbC.instance.Ugyfelkod = Ugyfelkod;
      ujbC.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(dto => {
        this.vcruj.clear();

        const buf = [...this.Dto];
        buf.unshift(dto);
        this.Dto = buf;

        this.docdr();
      });
      ujbC.instance.eventMegsem.pipe(untilComponentDestroyed(this)).subscribe(dto => {
        this.vcruj.clear();
      });

      this.docdr();
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
      this.vcruj.clear();
    }
  }

  async doUjirat() {
    this.vcruj.clear();
    this.tabla.clearselections();

    this.spinner = true;
    try {
      const resP1 = await this._projektservice.Get(this.Projektkod);
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

        const resPkk = await this.projektkapcsolatservice.AddIratToProjekt(new ProjektKapcsolatParam(
          this.Projektkod, 0, dtoIrat.Iratkod, new BizonylatDto()));
        if (resPkk.Error != null) {
          throw resPkk.Error;
        }

        const resPk = await this.projektkapcsolatservice.Get(resPkk.Result);
        if (resPk.Error != null) {
          throw resPk.Error;
        }

        this.spinner = false;
        this.vcruj.clear();

        const buf = [...this.Dto];
        buf.unshift(resPk.Result[0]);
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

  doUjajanlat() {
    this.vcruj.clear();
    this.tabla.clearselections();

    const ajanlatC = this.vcruj.createComponent(AjanlatComponent);

    ajanlatC.instance.Projektkod = this.Projektkod;
    ajanlatC.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.vcruj.clear();

      const buf = [...this.Dto];
      buf.unshift(dto);
      this.Dto = buf;

      this.docdr();
    });
    ajanlatC.instance.eventMegsem.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.vcruj.clear();
    });

    this.docdr();
  }

  doVagolaprol() {
    this.vcruj.clear();
    this.tabla.clearselections();

    this._vagolapservice.Mode = VagolapMode.Projekt;

    const vagolaprolC = this.vcruj.createComponent(ProjektkapcsolatVagolaprolComponent);

    vagolaprolC.instance.Projektkod = this.Projektkod;
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

    if (this.Dto[this.DtoSelectedIndex].Bizonylatkod !== null) {
      this.egymode = ProjektkapcsolatEgyMode.Egybizonylat;
    }
    if (this.Dto[this.DtoSelectedIndex].Iratkod !== null) {
      this.egymode = ProjektkapcsolatEgyMode.Egyirat;
    }
    this.tabla.egytetelstart();
  }

  onModositasutan(dto: ProjektKapcsolatDto) {
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





  // TODO app-bizonylat-egy eseménye, vszeg később nem kell
  torlesutan() {
    this.tabla.clearselections();
  }


  onLevalasztas(i: number) {
    // this.tabla.nemOk();
    this.DtoSelectedIndex = i;
  }

}
