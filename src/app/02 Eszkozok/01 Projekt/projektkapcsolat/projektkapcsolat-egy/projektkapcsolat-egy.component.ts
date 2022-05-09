import {
  AfterViewInit,
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit,
  Output, ViewChild, ViewContainerRef
} from '@angular/core';
import {ProjektKapcsolatDto} from '../projektkapcsolatdto';
import {OnDestroyMixin} from '@w11k/ngx-componentdestroyed';
import {ProjektkapcsolatEgyMode} from '../projektkapcsolategymode';
import {IratEgyComponent} from '../../../02 Irat/irat/irat-egy/irat-egy.component';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {IratService} from '../../../02 Irat/irat/irat.service';
import {BizonylatService} from '../../../../03 Bizonylatok/bizonylat/bizonylat.service';
import {BizonylatEgyComponent} from '../../../../bizonylat/bizonylat-egy/bizonylat-egy.component';
import {AjanlatComponent} from '../../ajanlat/ajanlat/ajanlat';
import {ProjektkapcsolatVagolaprolComponent} from '../projektkapcsolat-vagolaprol/projektkapcsolat-vagolaprol.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projektkapcsolat-egy',
  templateUrl: './projektkapcsolat-egy.component.html'
})
export class ProjektkapcsolatEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_projektkapcsolat', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() egymode = 0;
  @Input() projektkapcsolatDto: ProjektKapcsolatDto = new ProjektKapcsolatDto();

  @Output() eventUj: EventEmitter<ProjektKapcsolatDto> = new EventEmitter<ProjektKapcsolatDto>();
  @Output() eventTorles: EventEmitter<void> = new EventEmitter<void>();
  @Output() eventModositas: EventEmitter<ProjektKapcsolatDto> = new EventEmitter<ProjektKapcsolatDto>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              private _iratservice: IratService,
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
        // <!--<app-projektkapcsolat-ujbizonylat [Projektkod]="Projektkod"-->
        // <!--[Ugyfelkod]="Ugyfelkod"-->
        // <!--(eventUjbizonylatutan)="onUjbizonylatutan($event)">-->
        // <!--</app-projektkapcsolat-ujbizonylat>-->
        break;
      case ProjektkapcsolatEgyMode.UjIrat: // 2
        // <!--<app-irat-szerkesztes [uj]="true"-->
        // <!--[enUgyfel]="false"-->
        // <!--[Ugyfelkod]="Ugyfelkod"-->
        // <!--(eventSzerkeszteskesz)="onUjiratutan($event)">-->
        // <!--</app-irat-szerkesztes>-->
        break;
      case ProjektkapcsolatEgyMode.Ajanlat: // 3
        const ajanlatC = this.vcr.createComponent(AjanlatComponent);
        // TODO paraméterek, események
        // <!--<app-ajanlat [Projektkod]="Projektkod"-->
        // <!--(eventAjanlatkesz)="onAjanlatutan($event)">-->
        // <!--</app-ajanlat>-->
        break;
      case ProjektkapcsolatEgyMode.Vagolaprol: // 4
        const vagolaprolC = this.vcr.createComponent(ProjektkapcsolatVagolaprolComponent);
        // TODO paraméterek, események
        // <!--<app-projektkapcsolat-vagolaprol [Projektkod]="Projektkod"-->
        // <!--(eventVagolaprolutan)="onVagolaprolutan($event)"-->
        // <!--(eventVagolaprolutanvege)="onVagolaprolutanvege()">-->
        // <!--</app-projektkapcsolat-vagolaprol>-->
        break;
      case ProjektkapcsolatEgyMode.Egybizonylat: // 5
        this.spinner = true;
        try {
          const resEgyBizonylat = await this._bizonylatservice.Get(this.projektkapcsolatDto.Bizonylatkod);
          if (resEgyBizonylat.Error != null) {
            throw resEgyBizonylat.Error;
          }

          const bizonylatC = this.vcr.createComponent(BizonylatEgyComponent);
          // TODO paraméterek, események
          // <!--<app-bizonylat-egy [DtoOriginal]="OriginalBizonylat"-->
          // <!--[bizonylatTipus]=""-->
          // <!--[bizonylatLeiro]="bizonylatLeiro"-->
          // <!--[enTorles]="false"-->
          // <!--[enProjekt]="false"-->
          // <!--[(egymode)]="egybizonylat_egymode">-->
          // <!--</app-bizonylat-egy>-->

          this.spinner = false;
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
          // TODO események
          // <!--(eventSzerkesztesutan)="onIratSzerkesztesutan($event)">-->

          this.spinner = false;
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
