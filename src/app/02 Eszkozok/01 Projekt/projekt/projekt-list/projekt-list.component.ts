import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, ViewChild,
  ViewContainerRef
} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {SzMT} from '../../../../common/dtos/szmt';
import {Szempont} from '../../../../common/enums/szempont';
import {JogKod} from '../../../../common/enums/jogkod';
import {LogonService} from '../../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {ProjektTablaComponent} from '../projekttabla/projekt-tabla.component';
import {environment} from '../../../../../environments/environment';
import {ProjektParam} from '../projektparam';
import {ProjektDto} from '../projektdto';
import {propCopy} from '../../../../common/propCopy';
import {OnDestroyMixin, untilComponentDestroyed} from "@w11k/ngx-componentdestroyed";
import {ProjektSzerkesztesComponent} from "../projekt-szerkesztes/projekt-szerkesztes.component";
import {ProjektExportComponent} from "../projekt-export/projekt-export.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projekt-list',
  templateUrl: './projekt-list.component.html'
})
export class ProjektListComponent extends OnDestroyMixin implements OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: ProjektTablaComponent;
  @ViewChild('compcont_projektexport', {read: ViewContainerRef}) vcrexport: ViewContainerRef;
  @ViewChild('compcont_projektuj', {read: ViewContainerRef}) vcruj: ViewContainerRef;

  jegyzetszurok = ['Mind', 'Jegyzet is'];
  szurok = ['Id', 'Ügyfél', 'Ügyfélcím', 'Email', 'Telefon', 'Telepítési cím', 'Keletkezett', 'Műszaki állapot'];

  jegyzetSzempontok = [
    Szempont.Null, Szempont.CsakHaJegyzetIs
  ];
  szempontok = [
    Szempont.Kod, Szempont.Ugyfel,
    Szempont.UgyfelCim, Szempont.UgyfelEmail, Szempont.UgyfelTelefonszam,
    Szempont.TelepitesiCim, Szempont.Keletkezett, Szempont.MuszakiAllapot
  ];

  jog = false;

  statuszszempont = 0;
  jegyzetszempont = 0;
  szempont = 0;
  minta = '';
  pp = new ProjektParam(0, environment.lapmeret);
  elsokereses = true;
  OsszesRekord = 0;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  Dto = new Array<ProjektDto>();
  DtoSelectedIndex = -1;

  projektservice: ProjektService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              projektservice: ProjektService) {
    super();

    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PROJEKTMOD]);
    this.projektservice = projektservice;
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  onKereses() {
    this.vcrexport.clear();
    this.vcruj.clear();
    this.tabla.clearselections();

    this.elsokereses = true;
    this.pp.rekordtol = 0;
    this.pp.statusz = this.statuszszempont;
    this.pp.fi = new Array();
    if (this.jegyzetszempont !== 0) {
      this.pp.fi.push(new SzMT(this.jegyzetSzempontok[this.jegyzetszempont], ''));
    }
    this.pp.fi.push(new SzMT(this.szempontok[this.szempont], this.minta));

    this.onKeresesTovabb();
  }

  async onKeresesTovabb() {
    this.spinner = true;
    try {
      const res = await this.projektservice.Select(this.pp);
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
      this.OsszesRekord = res.OsszesRekord;

      this.pp.rekordtol += this.pp.lapmeret;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onExport(sszi: number) {
    this.vcrexport.clear()
    this.vcruj.clear();
    this.tabla.clearselections();
    const exportC = this.vcrexport.createComponent(ProjektExportComponent);

    exportC.instance.projektcsoport = this.projektservice.statuszszurok[sszi];
    exportC.instance.statuszszempont = this.statuszszempont;
    exportC.instance.eventBezar.pipe(untilComponentDestroyed(this)).subscribe(() => {
      this.vcrexport.clear();
    });
  }

  doUjtetel() {
    this.vcrexport.clear()
    this.vcruj.clear();
    this.tabla.clearselections();
    const ujC = this.vcruj.createComponent(ProjektSzerkesztesComponent);

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

  onModositasutan(dto: ProjektDto) {
    propCopy(dto, this.Dto[this.DtoSelectedIndex]);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
