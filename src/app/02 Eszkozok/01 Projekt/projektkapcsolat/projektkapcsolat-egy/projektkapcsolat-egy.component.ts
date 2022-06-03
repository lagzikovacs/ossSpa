import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output, ViewChild, ViewContainerRef
} from '@angular/core';
import {ProjektKapcsolatDto} from '../projektkapcsolatdto';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {ProjektkapcsolatEgyMode} from '../projektkapcsolategymode';
import {IratEgyComponent} from '../../../02 Irat/irat/irat-egy/irat-egy.component';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {IratService} from '../../../02 Irat/irat/irat.service';
import {BizonylatService} from '../../../../03 Bizonylatok/bizonylat/bizonylat.service';
import {BizonylatEgyComponent} from '../../../../03 Bizonylatok/bizonylat/bizonylat-egy/bizonylat-egy.component';
import {AjanlatComponent} from '../../ajanlat/ajanlat/ajanlat';
import {ProjektkapcsolatVagolaprolComponent} from '../projektkapcsolat-vagolaprol/projektkapcsolat-vagolaprol.component';
import {ProjektkapcsolatUjbizonylatComponent} from '../projektkapcsolat-ujbizonylat/projektkapcsolat-ujbizonylat.component';
import {IratSzerkesztesComponent} from '../../../02 Irat/irat/irat-szerkesztes/irat-szerkesztes.component';
import {ProjektService} from '../../projekt/projekt.service';
import {BizonylatDto} from '../../../../03 Bizonylatok/bizonylat/bizonylatdto';
import {ProjektKapcsolatParam} from '../projektkapcsolatparam';
import {ProjektkapcsolatService} from '../projektkapcsolat.service';
import {IratlevalasztasMode} from '../../../02 Irat/irat/iratlevalasztasmode';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projektkapcsolat-egy',
  templateUrl: './projektkapcsolat-egy.component.html'
})
export class ProjektkapcsolatEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_projektkapcsolat', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() egymode = 0;
  @Input() Projektkod = 0;
  @Input() projektkapcsolatDto: ProjektKapcsolatDto = new ProjektKapcsolatDto();

  @Output() eventUj: EventEmitter<ProjektKapcsolatDto> = new EventEmitter<ProjektKapcsolatDto>();
  @Output() eventModositas: EventEmitter<ProjektKapcsolatDto> = new EventEmitter<ProjektKapcsolatDto>();

  @Output() eventLevalasztasutan: EventEmitter<void> = new EventEmitter<void>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              private _projektkapcsolatservice: ProjektkapcsolatService,
              private _iratservice: IratService,
              private _projektservice: ProjektService,
              private _bizonylatservice: BizonylatService) {
    super();
  }

  ngAfterViewInit() {
    this.doNav();
  }

  async doNav() {
    this.vcr.clear();

    switch (this.egymode) {
      case ProjektkapcsolatEgyMode.UjBizonylat: // 1

        break;
      case ProjektkapcsolatEgyMode.UjIrat: // 2

        break;
      case ProjektkapcsolatEgyMode.Ajanlat: // 3

        break;
      case ProjektkapcsolatEgyMode.Vagolaprol: // 4

        break;
      case ProjektkapcsolatEgyMode.Egybizonylat: // 5
        this.spinner = true;
        try {
          const resEgyBizonylat = await this._bizonylatservice.Get(this.projektkapcsolatDto.Bizonylatkod);
          if (resEgyBizonylat.Error != null) {
            throw resEgyBizonylat.Error;
          }
          const resEgyLeiro = await this._bizonylatservice.BizonylatLeiro(resEgyBizonylat.Result[0].Bizonylattipuskod);
          if (resEgyLeiro.Error != null) {
            throw resEgyLeiro.Error;
          }
          this.spinner = false;

          const bizonylatC = this.vcr.createComponent(BizonylatEgyComponent);
          bizonylatC.instance.DtoOriginal = resEgyBizonylat.Result[0];
          bizonylatC.instance.bizonylatTipus = resEgyBizonylat.Result[0].Bizonylattipuskod;
          bizonylatC.instance.bizonylatLeiro = resEgyLeiro.Result;
          bizonylatC.instance.enTorles = false;
          bizonylatC.instance.enProjekt = false;
          bizonylatC.instance.enLevalasztas = true;
          bizonylatC.instance.projektkapcsolatDto = this.projektkapcsolatDto;
          // TODO események

          this._cdr.markForCheck();
          this._cdr.detectChanges();
        } catch (err) {
          this.spinner = false;
          this._errorservice.Error = err;
        }
        break;
      case ProjektkapcsolatEgyMode.Egyirat: // 6
        this.spinner = true;
        try {
          const resEgyIrat = await this._iratservice.Get(this.projektkapcsolatDto.Iratkod);
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
          iratC.instance.LevalasztasMode = IratlevalasztasMode.Projektrol;
          iratC.instance.projektkapcsolatDto = this.projektkapcsolatDto;
          iratC.instance.eventModositas.pipe(untilComponentDestroyed(this)).subscribe(async dto => {
            if (dto !== undefined) {
              const resP2 = await this._projektkapcsolatservice.Get(this.projektkapcsolatDto.Projektkapcsolatkod);
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

//   <!--<app-projektkapcsolat-levalasztas [Dto]="Dto[DtoSelectedIndex]"-->
//   <!--(eventLevalasztasutan)="onLevalasztasutan($event)">-->
// <!--</app-projektkapcsolat-levalasztas>-->

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
