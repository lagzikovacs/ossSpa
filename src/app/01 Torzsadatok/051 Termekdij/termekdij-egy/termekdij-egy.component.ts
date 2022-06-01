import {
  AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild, ViewContainerRef, EventEmitter,
  Output, ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {TermekdijDto} from '../termekdijdto';
import {deepCopy} from '../../../common/deepCopy';
import {ErrorService} from '../../../common/errorbox/error.service';
import {TermekdijService} from '../termekdij.service';
import {propCopy} from '../../../common/propCopy';
import {EgyMode} from '../../../common/enums/egymode';
import {ReszletekComponent} from '../../../common/reszletek/reszletek.component';
import {TetelTorlesComponent} from '../../../common/tetel-torles/tetel-torles.component';
import {TermekdijSzerkesztesComponent} from '../termekdij-szerkesztes/termekdij-szerkesztes.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-termekdij-egy',
  templateUrl: './termekdij-egy.component.html'
})
export class TermekdijEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_termekdij', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() defaultNav = 0;
  Dto = new TermekdijDto();
  @Input() set dto(value: TermekdijDto) {
    this.Dto = deepCopy(value);
  }
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<TermekdijDto> = new EventEmitter<TermekdijDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this.docdr();
  }

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              private _termekdijservice: TermekdijService) {
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

        reszletekC.instance.cim = this._termekdijservice.cim;
        reszletekC.instance.item = this.Dto;
        reszletekC.instance.colsets = this._termekdijservice.ReszletekSettings;
        break;
      case EgyMode.Torles: // 2
        const teteltorlesC = this.vcr.createComponent(TetelTorlesComponent);

        teteltorlesC.instance.cim = this._termekdijservice.cim;
        teteltorlesC.instance.eventTorles.pipe(untilComponentDestroyed(this)).subscribe(ok => {
          this.doTorles(ok);
        });
        break;
      case EgyMode.Modositas: // 3
        const C = this.vcr.createComponent(TermekdijSzerkesztesComponent);

        C.instance.uj = false;
        C.instance.DtoOriginal = this.Dto;
        C.instance.eventOk.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doModositaskesz(dto);
        });
        C.instance.eventMegsem.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doNav(0);
        });
        break;
    }
  }

  async doTorles(ok: boolean) {
    if (ok) {
      this.spinner = true;
      try {
        const res = await this._termekdijservice.Delete(this.Dto);
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

  doModositaskesz(dto: TermekdijDto) {
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
