import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit,
  ViewChild
} from '@angular/core';
import {ProjektjegyzetService} from '../projektjegyzet.service';
import {ErrorService} from '../../../../common/errorbox/error.service';
import {ProjektjegyzetDto} from '../projektjegyzetdto';
import {EgyMode} from '../../../../common/enums/egymode';
import {propCopy} from '../../../../common/propCopy';
import {TablaExComponent} from "../../../../common/tabla-ex/tabla-ex.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projekt-jegyzet-list',
  templateUrl: './projekt-jegyzet-list.component.html'
})
export class ProjektJegyzetListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaExComponent;

  @Input() Projektkod = -1;

  Dto = new Array<ProjektjegyzetDto>();
  DtoSelectedIndex = -1;

  uj = false;

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  projektjegyzetservice: ProjektjegyzetService;

  constructor(private _errorservice: ErrorService,
              private _cdr: ChangeDetectorRef,
              projektjegyzetservice: ProjektjegyzetService) {
    this.projektjegyzetservice = projektjegyzetservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  async onKereses() {
    this.tabla.clearselections();

    this.spinner = true;
    try {
      const res = await this.projektjegyzetservice.Select(this.Projektkod);
      if (res.Error !== null) {
        throw res.Error;
      }

      this.Dto = res.Result;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;

    this.uj = false;
    this.tabla.egytetelstart();
  }

  doUjtetel() {
    this.uj = true;
    this.tabla.ujtetelstart();
  }

  onUjtetelkesz(dto: ProjektjegyzetDto) {
    if (dto !== undefined) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }

  onTorles() {
    this.Dto.splice(this.DtoSelectedIndex, 1);
    this.DtoSelectedIndex = -1;
    this.tabla.clearselections();
  }

  onModositaskesz(dto: ProjektjegyzetDto) {
    propCopy(dto, this.Dto[this.DtoSelectedIndex]);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
