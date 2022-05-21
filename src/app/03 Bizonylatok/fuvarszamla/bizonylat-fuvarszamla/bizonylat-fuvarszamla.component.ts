import {
  Component, Input, OnDestroy, Output, EventEmitter, ViewContainerRef, ViewChild,
  ChangeDetectionStrategy, ChangeDetectorRef
} from '@angular/core';
import {BizonylatDto} from '../../bizonylat/bizonylatdto';
import {OnDestroyMixin, untilComponentDestroyed} from '@w11k/ngx-componentdestroyed';
import {BizonylatFuvarszamlaUjComponent} from '../bizonylat-fuvarszamla-uj/bizonylat-fuvarszamla-uj.component';
import {BizonylatFuvarszamlaTorlesComponent} from '../bizonylat-fuvarszamla-torles/bizonylat-fuvarszamla-torles.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-bizonylat-fuvarszamla',
  templateUrl: './bizonylat-fuvarszamla.component.html'
})
export class BizonylatFuvarszamlaComponent extends OnDestroyMixin implements OnDestroy {
  @ViewChild('compcont_fuvarszamla', {read: ViewContainerRef}) vcr: ViewContainerRef;

  @Input() dtoAnyagszamla: BizonylatDto;
  @Output() eventOK = new EventEmitter<BizonylatDto>();

  constructor(private _cdr: ChangeDetectorRef) {
    super();
  }

  doNav(i: number) {
    this.vcr.clear();

    switch (i) {
      case 1:
        const ujC = this.vcr.createComponent(BizonylatFuvarszamlaUjComponent);
        ujC.instance.dtoAnyagszamla = this.dtoAnyagszamla;
        ujC.instance.eventOK.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doOK(dto);
        });
        ujC.instance.eventMegsem.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doMegsem();
        });

        break;

      case 2:
        const torlesC = this.vcr.createComponent(BizonylatFuvarszamlaTorlesComponent);
        torlesC.instance.dtoAnyagszamla = this.dtoAnyagszamla;
        torlesC.instance.eventOK.pipe(untilComponentDestroyed(this)).subscribe(dto => {
          this.doOK(dto);
        });
        torlesC.instance.eventMegsem.pipe(untilComponentDestroyed(this)).subscribe(() => {
          this.doMegsem();
        });
        break;
    }
  }


  doOK(dtoMod: BizonylatDto) {
    this.eventOK.emit(dtoMod);
    this.doNav(0);
  }

  doMegsem() {
    this.doNav(0);
  }

  override ngOnDestroy(): void {
    super.ngOnDestroy();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
