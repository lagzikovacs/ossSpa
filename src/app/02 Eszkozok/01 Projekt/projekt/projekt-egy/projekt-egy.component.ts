import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {ProjektService} from '../projekt.service';
import {JogKod} from '../../../../common/enums/jogkod';
import {ProjektDto} from '../projektdto';
import {deepCopy} from '../../../../common/deepCopy';
import {LogonService} from '../../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {EgyMode} from '../../../../common/enums/egymode';
import {ReszletekComponent} from '../../../../common/reszletek/reszletek.component';
import {TetelTorlesComponent} from '../../../../common/tetel-torles/tetel-torles.component';
import {propCopy} from '../../../../common/propCopy';
import {ProjektkapcsolatListComponent} from '../../../../projektkapcsolat/projektkapcsolat-list/projektkapcsolat-list.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projekt-egy',
  templateUrl: './projekt-egy.component.html'
})
export class ProjektEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_projekt', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() defaultNav = 24;

  Dto = new ProjektDto();
  @Input() set dto(value: ProjektDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventUj: EventEmitter<ProjektDto> = new EventEmitter<ProjektDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<ProjektDto> = new EventEmitter<ProjektDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  jog = false;
  projektservice: ProjektService;

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              projektservice: ProjektService) {
    super();

    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.PROJEKTMOD]);
    this.projektservice = projektservice;
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
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.projektservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.projektservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.projektservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        // <app-projekt-szerkesztes [uj]="false"
        //   [DtoOriginal]="Dto[DtoSelectedIndex]"
        // (eventSzerkeszteskesz)="onModositaskesz($event)">
        //   </app-projekt-szerkesztes>
        break;
      case EgyMode.Statusz: // 19
      //   <div [@rowanimation]><app-projekt-statusz [DtoOriginal]="Dto[DtoSelectedIndex]"
      // (eventOk)="onSegedOk($event)"
      // (eventCancel)="onSegedCancel()">
      //   </app-projekt-statusz></div>
        break;
      case EgyMode.Muszakiallapot: // 20
        // <app-projekt-muszakiallapot [DtoOriginal]="Dto[DtoSelectedIndex]"
        // (eventOk)="onSegedOk($event)"
        // (eventCancel)="onSegedCancel()">
        //   </app-projekt-muszakiallapot>
        break;
      case EgyMode.Iratminta: // 23
        // <app-projekt-iratminta [Projektkod]="Dto[DtoSelectedIndex].Projektkod"
        // (eventMunkalaputan)="onMunkalaputan()">
        //   </app-projekt-iratminta>
        break;
      case EgyMode.Bizonylatesirat: // 24
        const projektkapcsolatlistC = this.vcr.createComponent(ProjektkapcsolatListComponent);
        projektkapcsolatlistC.instance.Projektkod = this.Dto.Projektkod;
        projektkapcsolatlistC.instance.Ugyfelkod = this.Dto.Ugyfelkod;
        break;
      case EgyMode.Jegyzet: // 26
        // <app-projekt-jegyzet-list [Projektkod]="Dto[DtoSelectedIndex].Projektkod">
        //   </app-projekt-jegyzet-list>
        break;
      case EgyMode.FelmeresProjekthez: // 43
        // <app-felmeres-list [ProjektBol]="true" [ProjektDto]="Dto[DtoSelectedIndex]" [statusz]="0">
        //   </app-felmeres-list>
        break;
      case EgyMode.HibabejelentesProjekthez: // 44
        // <app-hibabejelentes-list [ProjektBol]="true" [ProjektDto]="Dto[DtoSelectedIndex]">
        //   </app-hibabejelentes-list>
        break;
    }
  }

  doUjkesz(dto: ProjektDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res =  await this.projektservice.Delete(this.Dto);
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

  doModositaskesz(dto: ProjektDto) {
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
