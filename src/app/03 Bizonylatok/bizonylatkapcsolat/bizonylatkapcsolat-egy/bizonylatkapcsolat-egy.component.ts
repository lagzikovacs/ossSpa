import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {BizonylatKapcsolatDto} from '../bizonylatkapcsolatdto';
import {ErrorService} from '../../../common/errorbox/error.service';
import {BizonylatkapcsolatEgyMode} from '../bizonylatkapcsolategymode';
import {BizonylatkapcsolatVagolaprolComponent} from '../bizonylatkapcsolat-vagolaprol/bizonylatkapcsolat-vagolaprol.component';
import {BizonylatService} from '../../bizonylat/bizonylat.service';
import {IratSzerkesztesComponent} from '../../../02 Eszkozok/02 Irat/irat/irat-szerkesztes/irat-szerkesztes.component';
import {BizonylatkapcsolatService} from '../bizonylatkapcsolat.service';
import {BizonylatKapcsolatParam} from '../bizonylatkapcsolatparam';
import {IratEgyComponent} from '../../../02 Eszkozok/02 Irat/irat/irat-egy/irat-egy.component';
import {IratService} from '../../../02 Eszkozok/02 Irat/irat/irat.service';
import {IratlevalasztasMode} from '../../../02 Eszkozok/02 Irat/irat/iratlevalasztasmode';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylatkapcsolat-egy',
  templateUrl: './bizonylatkapcsolat-egy.component.html'
})
export class BizonylatkapcsolatEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_bizonylatkapcsolat', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() egymode = 0;
  @Input() Bizonylatkod = 0;
  @Input() bizonylatkapcsolatDto: BizonylatKapcsolatDto = new BizonylatKapcsolatDto();

  @Output() eventUj: EventEmitter<BizonylatKapcsolatDto> = new EventEmitter<BizonylatKapcsolatDto>();
  @Output() eventModositas: EventEmitter<BizonylatKapcsolatDto> = new EventEmitter<BizonylatKapcsolatDto>();

  @Output() eventLevalasztasutan: EventEmitter<void> = new EventEmitter<void>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              private _bizonylatservice: BizonylatService,
              private _bizonylatkapcsolatservice: BizonylatkapcsolatService,
              private _iratservice: IratService) {
    super();
  }

  ngAfterViewInit() {
    this.doNav();
  }

  async doNav() {
    this.vcr.clear();

    switch (this.egymode) {
      case BizonylatkapcsolatEgyMode.UjIrat: // 1
        this.spinner = true;
        try {
          const resP1 = await this._bizonylatservice.Get(this.Bizonylatkod);
          if (resP1.Error != null) {
            throw resP1.Error;
          }
          const ugyfelkod1 = resP1.Result[0].Ugyfelkod;
          this.spinner = false;

          const ujiC = this.vcr.createComponent(IratSzerkesztesComponent);
          ujiC.instance.uj = true;
          ujiC.instance.enUgyfel = false;
          ujiC.instance.Ugyfelkod = ugyfelkod1;
          ujiC.instance.eventSzerkeszteskesz.pipe(untilComponentDestroyed(this)).subscribe(async dtoIrat => {
            if (dtoIrat !== undefined) {
              this.spinner = true;

              const resBkk = await this._bizonylatkapcsolatservice.AddIratToBizonylat(new BizonylatKapcsolatParam(
                this.Bizonylatkod, dtoIrat.Iratkod));
              if (resBkk.Error != null) {
                throw resBkk.Error;
              }

              const resBk = await this._bizonylatkapcsolatservice.Get(resBkk.Result);
              if (resBk.Error != null) {
                throw resBk.Error;
              }

              this.spinner = false;
              this.eventUj.emit(resBk.Result[0]);
            } else {
              this.eventUj.emit(null);
            }
          });

          this._cdr.markForCheck();
          this._cdr.detectChanges();
        } catch (err) {
          this.spinner = false;
          this._errorservice.Error = err;
          this.eventUj.emit(null);
        }
      break;
      case BizonylatkapcsolatEgyMode.Vagolaprol: // 2
        const vagolaprolC = this.vcr.createComponent(BizonylatkapcsolatVagolaprolComponent);

        vagolaprolC.instance.Bizonylatkod = this.Bizonylatkod;
        vagolaprolC.instance.eventVagolaprolutan.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.eventUj.emit(dto);
        });
        vagolaprolC.instance.eventVagolaprolutanvege.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.eventUj.emit(null);
        });

        this._cdr.markForCheck();
        this._cdr.detectChanges();
      break;
      case BizonylatkapcsolatEgyMode.Egyirat: // 3
        this.spinner = true;
        try {
          const resEgyIrat = await this._iratservice.Get(this.bizonylatkapcsolatDto.Iratkod);
          if (resEgyIrat.Error != null) {
            throw resEgyIrat.Error;
          }

          const iratC = this.vcr.createComponent(IratEgyComponent);
          iratC.instance.uj = false;
          iratC.instance.Dto = resEgyIrat.Result[0];
          iratC.instance.enTorles = false;
          iratC.instance.enProjekt = false;
          iratC.instance.enUgyfel = false;
          iratC.instance.enLevalasztas = true;
          iratC.instance.LevalasztasMode = IratlevalasztasMode.Bizonylatrol;
          iratC.instance.bizonylatkapcsolatDto = this.bizonylatkapcsolatDto;
          iratC.instance.eventModositas.pipe(untilComponentDestroyed(this)).subscribe(async dto => {
            if (dto !== undefined) {
              const resP2 = await this._bizonylatkapcsolatservice.Get(this.bizonylatkapcsolatDto.Bizonylatkapcsolatkod);
              if (resP2.Error != null) {
                throw resP2.Error;
              }
              this.eventModositas.emit(resP2.Result[0]);
            } else {
              this.eventModositas.emit(null);
            }
          });
          iratC.instance.eventLevalasztasutan.pipe(untilComponentDestroyed(this)).subscribe(() => {
            this.eventLevalasztasutan.emit();
          });
          this.spinner = false;

          this._cdr.markForCheck();
          this._cdr.detectChanges();
        } catch (err) {
          this.spinner = false;
          this._errorservice.Error = err;
        }
      break;
    }
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
