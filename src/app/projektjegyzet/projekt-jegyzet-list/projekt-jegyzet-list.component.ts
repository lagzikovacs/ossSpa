import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ProjektjegyzetService} from '../../02 Eszkozok/01 Projekt/projektjegyzet/projektjegyzet.service';
import {ErrorService} from '../../common/errorbox/error.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {ProjektjegyzetDto} from '../../02 Eszkozok/01 Projekt/projektjegyzet/projektjegyzetdto';
import {EgyMode} from '../../common/enums/egymode';
import {propCopy} from '../../common/propCopy';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-projekt-jegyzet-list',
  templateUrl: './projekt-jegyzet-list.component.html',
  animations: [rowanimation]
})
export class ProjektJegyzetListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  @Input() Projektkod = -1;

  Dto = new Array<ProjektjegyzetDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Reszletek;

  eppFrissit = false;

  projektjegyzetservice: ProjektjegyzetService;

  constructor(private _errorservice: ErrorService,
              projektjegyzetservice: ProjektjegyzetService) {
    this.projektjegyzetservice = projektjegyzetservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.tabla.clearselections();

    this.eppFrissit = true;
    this.projektjegyzetservice.Select(this.Projektkod)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.Dto = res.Result;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;
    this.egymode = 0;
  }

  doNav(i: number) {
    this.egymode = i;
  }

  onUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: ProjektjegyzetDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: ProjektjegyzetDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = 0;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.projektjegyzetservice.Delete(this.Dto[this.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.Dto.splice(this.DtoSelectedIndex, 1);
          this.DtoSelectedIndex = -1;

          this.eppFrissit = false;
          this.tabla.clearselections();
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.egymode = 0;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
