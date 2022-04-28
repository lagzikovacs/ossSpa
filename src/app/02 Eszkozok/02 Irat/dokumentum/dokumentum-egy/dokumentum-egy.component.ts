import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {DokumentumDto} from '../dokumentumdto';
import {deepCopy} from '../../../../common/deepCopy';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {DokumentumService} from '../dokumentum.service';
import {propCopy} from '../../../../common/propCopy';
import {EgyMode} from '../../../../common/enums/egymode';
import {LogonService} from '../../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {JogKod} from '../../../../common/enums/jogkod';
import {DokumentumFeltoltesComponent} from '../dokumentum-feltoltes/dokumentum-feltoltes.component';
import {ReszletekComponent} from '../../../../common/reszletek/reszletek.component';
import {TetelTorlesComponent} from '../../../../common/tetel-torles/tetel-torles.component';
import {DokumentumLetoltesComponent} from '../dokumentum-letoltes/dokumentum-letoltes.component';
import {DokumentumLetoltesPdfComponent} from '../dokumentum-letoltes-pdf/dokumentum-letoltes-pdf.component';
import {DokumentumNezetComponent} from '../dokumentum-nezet/dokumentum-nezet.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-dokumentum-egy',
  templateUrl: './dokumentum-egy.component.html'
})
export class DokumentumEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_dokumentum', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() defaultNav = 0;
  @Input() Iratkod = -1;
  Dto = new DokumentumDto();
  @Input() set dto(value: DokumentumDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventUj: EventEmitter<DokumentumDto> = new EventEmitter<DokumentumDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<DokumentumDto> = new EventEmitter<DokumentumDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  jog = false;
  dokumentumservice: DokumentumService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              dokumentumservice: DokumentumService) {
    super();

    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.IRATMOD]);
    this.dokumentumservice = dokumentumservice;
  }

  ngAfterViewInit() {
    if (this.uj) {
      this.doNav(EgyMode.Uj);
      this.docdr();
    }

    if (!this.uj && this.defaultNav > 0) {
      this.doNav(this.defaultNav);
      this.docdr();
    }
  }

  docdr() {
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  doNav(i: number) {
    this.vcr.clear();

    switch (i) {
      case EgyMode.Uj: // -1
        const ujC = this.vcr.createComponent(DokumentumFeltoltesComponent);
        ujC.instance.Iratkod = this.Iratkod;
        ujC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.dokumentumservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.dokumentumservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.dokumentumservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.PDFNezet: // 38
        const letoltesC = this.vcr.createComponent(DokumentumLetoltesComponent);
        letoltesC.instance.item = this.Dto;
        break;
      case EgyMode.DokumentumLetoltes: // 39
        const nezetC = this.vcr.createComponent(DokumentumNezetComponent);
        nezetC.instance.item = this.Dto;
        break;
      case EgyMode.DokumentumLetoltesPDF: // 40
        const letoltespdfC = this.vcr.createComponent(DokumentumLetoltesPdfComponent);
        letoltespdfC.instance.item = this.Dto;
        break;
    }
  }

  doUjkesz(dto: DokumentumDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this.dokumentumservice.Delete(this.Dto);
        if (res.Error != null) {
          throw res.Error;
        }

        this.spinner = false;
        this.doNav(0);

        this.eventTorles.emit();
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    } else {
      this.doNav(0);
    }
  }

  doModositaskesz(dto: DokumentumDto) {
    if (dto !== undefined) {
      propCopy(dto, this.Dto);

      this.eventModositas.emit(dto);
    }
    this.doNav(0);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
