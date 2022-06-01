import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {FelhasznaloDto} from '../felhasznalodto';
import {deepCopy} from '../../../common/deepCopy';
import {ErrorService} from '../../../common/errorbox/error.service';
import {FelhasznaloService} from '../felhasznalo.service';
import {propCopy} from '../../../common/propCopy';
import {ReszletekComponent} from '../../../common/reszletek/reszletek.component';
import {EgyMode} from '../../../common/enums/egymode';
import {FelhasznaloSzerkesztesComponent} from '../felhasznalo-szerkesztes/felhasznalo-szerkesztes.component';
import {TetelTorlesComponent} from '../../../common/tetel-torles/tetel-torles.component';
import {EsemenynaploComponent} from '../esemenynaplo/esemenynaplo.component';
import {FelhasznaloJelszoComponent} from '../felhasznalo-jelszo/felhasznalo-jelszo.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-felhasznalo-egy',
  templateUrl: './felhasznalo-egy.component.html'
})
export class FelhasznaloEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_felhasznalo', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() defaultNav = 0;
  Dto = new FelhasznaloDto();
  @Input() set dto(value: FelhasznaloDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<FelhasznaloDto> = new EventEmitter<FelhasznaloDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              private _felhasznaloservice: FelhasznaloService) {
    super();
  }

  ngAfterViewInit() {
    if (this.defaultNav > 0) {
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
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this._felhasznaloservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this._felhasznaloservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this._felhasznaloservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(FelhasznaloSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        C.instance.eventMegsem.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doNav(0);
        });
        break;
      case EgyMode.Jelszo: // 4
        const felhasznalojelszoC = this.vcr.createComponent(FelhasznaloJelszoComponent);

        felhasznalojelszoC.instance.DtoOriginal = this.Dto;
        felhasznalojelszoC.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        felhasznalojelszoC.instance.eventMegsem.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doNav(0);
        });
        break;
      case EgyMode.Tevekenyseg: // 5
        const esemenynaploC = this.vcr.createComponent(EsemenynaploComponent);

        esemenynaploC.instance.Felhasznalokod = this.Dto.Felhasznalokod;
        break;
    }
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this._felhasznaloservice.Delete(this.Dto);
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

  doModositaskesz(dto: FelhasznaloDto) {
    this.doNav(0);
    propCopy(dto, this.Dto);
    this.eventModositas.emit(dto);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
