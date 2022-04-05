import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {FizetesimodDto} from '../fizetesimoddto';
import {deepCopy} from '../../../common/deepCopy';
import {ErrorService} from '../../../common/errorbox/error.service';
import {FizetesimodService} from '../fizetesimod.service';
import {propCopy} from '../../../common/propCopy';
import {FizetesimodSzerkesztesComponent} from '../fizetesimod-szerkesztes/fizetesimod-szerkesztes.component';
import {EgyMode} from '../../../common/enums/egymode';
import {TetelTorlesComponent} from '../../../common/tetel-torles/tetel-torles.component';
import {ReszletekComponent} from '../../../common/reszletek/reszletek.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-fizetesimod-egy',
  templateUrl: './fizetesimod-egy.component.html'
})
export class FizetesimodEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_fizetesimod', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() uj = false;
  @Input() defaultNav = 0;
  Dto = new FizetesimodDto();
  @Input() set dto(value: FizetesimodDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventUj: EventEmitter<FizetesimodDto> = new EventEmitter<FizetesimodDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<FizetesimodDto> = new EventEmitter<FizetesimodDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  fizetesimodservice: FizetesimodService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              fizetesimodservice: FizetesimodService) {
    super();

    this.fizetesimodservice = fizetesimodservice;
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
        const ujC = this.vcr.createComponent(FizetesimodSzerkesztesComponent);

        ujC.instance.uj = true;
        ujC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doUjkesz(dto);
        });
        break;
      case EgyMode.Reszletek: // 1
        const reszletekC = this.vcr.createComponent(ReszletekComponent);

        reszletekC.instance.cim = this.fizetesimodservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this.fizetesimodservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this.fizetesimodservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(FizetesimodSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        break;
    }
  }

  doUjkesz(dto: FizetesimodDto) {
    this.eventUj.emit(dto);
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this.fizetesimodservice.Delete(this.Dto);
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

  doModositaskesz(dto: FizetesimodDto) {
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
