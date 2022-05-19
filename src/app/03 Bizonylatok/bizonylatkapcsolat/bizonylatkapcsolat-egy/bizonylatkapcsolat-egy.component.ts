import {
  AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {OnDestroyMixin} from "@w11k/ngx-componentdestroyed";
import {BizonylatKapcsolatDto} from "../bizonylatkapcsolatdto";
import {ErrorService} from "../../../common/errorbox/error.service";
import {BizonylatkapcsolatEgyMode} from "../bizonylatkapcsolategymode";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylatkapcsolat-egy',
  templateUrl: './bizonylatkapcsolat-egy.component.html'
})
export class BizonylatkapcsolatEgyComponent extends OnDestroyMixin implements AfterViewInit, OnDestroy {
  @ViewChild('compcont_bizonylatkapcsolat', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() egymode = 0;
  @Input() Bizonylatkod = 0;
  @Input() projektkapcsolatDto: BizonylatKapcsolatDto = new BizonylatKapcsolatDto();

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
              private _cdr: ChangeDetectorRef) {
    super();
  }

  ngAfterViewInit() {
    this.doNav();
  }

  async doNav() {
    this.vcr.clear();

    switch (this.egymode) {
      case BizonylatkapcsolatEgyMode.UjIrat: // 1
      break;
      case BizonylatkapcsolatEgyMode.Vagolaprol: // 2
      break;
      case BizonylatkapcsolatEgyMode.Egyirat: // 3
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
