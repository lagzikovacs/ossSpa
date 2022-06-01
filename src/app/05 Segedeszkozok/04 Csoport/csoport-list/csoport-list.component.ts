import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {CsoportService} from '../csoport.service';
import {ErrorService} from '../../../common/errorbox/error.service';
import {environment} from '../../../../environments/environment';
import {CsoportDto} from '../csoportdto';
import {propCopy} from '../../../common/propCopy';
import {EgyszeruKeresesParam} from '../../../common/dtos/egyszerukeresesparam';
import {LogonService} from '../../05 Bejelentkezes/logon.service';
import {JogKod} from '../../../common/enums/jogkod';
import {TablaExComponent} from '../../../common/tabla-ex/tabla-ex.component';
import {CsoportSzerkesztesComponent} from '../csoport-szerkesztes/csoport-szerkesztes.component';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-csoport-list',
  templateUrl: './csoport-list.component.html'
})
export class CsoportListComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaExComponent;
  @ViewChild('compcont_csoportuj', {read: ViewContainerRef}) vcruj: ViewContainerRef;

  szurok = ['Csoport'];
  ekDto = new EgyszeruKeresesParam(0, '', environment.lapmeret);
  elsokereses = true;
  jog = false;

  Dto = new Array<CsoportDto>();
  DtoSelectedIndex = -1;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  csoportservice: CsoportService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              csoportservice: CsoportService) {
    super();

    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.CSOPORT]);
    this.csoportservice = csoportservice;
  }

  ngAfterViewInit() {
    this.onKereses();
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  onKereses() {
    this.vcruj.clear();
    this.tabla.clearselections();

    this.elsokereses = true;
    this.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  async onKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.csoportservice.Read(this.ekDto.minta);
      if (res.Error != null) {
        throw res.Error;
      }

      if (this.elsokereses) {
        this.Dto = res.Result;
        this.elsokereses = false;
      } else {
        const buf = [...this.Dto];
        res.Result.forEach(element => {
          buf.push(element);
        });
        this.Dto = buf;
      }

      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  doUjtetel() {
    this.vcruj.clear();
    this.tabla.clearselections();
    const ujC = this.vcruj.createComponent(CsoportSzerkesztesComponent);

    ujC.instance.uj = true;
    ujC.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(dto => {
      this.vcruj.clear();

      const buf = [...this.Dto];
      buf.unshift(dto);
      this.Dto = buf;

      this.docdr();
    });
    ujC.instance.eventMegsem.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcruj.clear();
    });
  }

  onId(i: number) {
    this.vcruj.clear();
    this.DtoSelectedIndex = i;
    this.tabla.egytetelstart();
  }

  onTorles() {
    this.Dto.splice(this.DtoSelectedIndex, 1);
    this.DtoSelectedIndex = -1;
    this.tabla.clearselections();
  }

  onModositas(dto: CsoportDto) {
    propCopy(dto, this.Dto[this.DtoSelectedIndex]);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
