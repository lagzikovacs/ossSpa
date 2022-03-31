import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {DokumentumDto} from '../dokumentumdto';
import {ErrorService} from '../../tools/errorbox/error.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {EgyMode} from '../../enums/egymode';
import {propCopy} from '../../tools/propCopy';
import {rowanimation} from '../../animation/rowAnimation';

@Component({
  selector: 'app-dokumentum-list',
  templateUrl: './dokumentum-list.component.html',
  animations: [rowanimation]
})
export class DokumentumListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  @Input() Iratkod = -1;
  @Input() cim = 'Dokumentum';
  @Input() mod = true;

  Dto = new Array<DokumentumDto>();
  DtoSelectedIndex = -1;

  elsokereses = true;

  egymode = 0;

  eppFrissit = false;

  pdf: any;

  dokumentumservice: DokumentumService;

  constructor(private _errorservice: ErrorService,
              dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.elsokereses = true;
    this.Dto = new Array<DokumentumDto>();
    this.DtoSelectedIndex = -1;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.dokumentumservice.Select(this.Iratkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.elsokereses = false;

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

  doUjtetel() {
    this.tabla.ujtetelstart();
  }
  onUjtetelkesz(dto: DokumentumDto) {
    if (dto !== null) {
      this.Dto.unshift(dto);
    }
    this.tabla.ujtetelstop();
  }
  onModositaskesz(dto: DokumentumDto) {
    if (dto !== null) {
      propCopy(dto, this.Dto[this.DtoSelectedIndex]);
    }
    this.egymode = 0;
  }
  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.dokumentumservice.Delete(this.Dto[this.DtoSelectedIndex])
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

  onKimentesDirekt(i: number) {
    this.DtoSelectedIndex = i;
    this.doNav(39);
  }

  onNezetDirekt(i: number) {
    this.DtoSelectedIndex = i;
    this.doNav(38);
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
