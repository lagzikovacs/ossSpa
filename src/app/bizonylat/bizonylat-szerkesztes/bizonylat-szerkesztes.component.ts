import {Component, ViewChild} from '@angular/core';
import {BizonylatService} from '../bizonylat.service';
import {UgyfelService} from '../../ugyfel/ugyfel.service';
import {PenznemService} from '../../penznem/penznem.service';
import {PenznemContainerMode} from '../../penznem/penznemcontainermode';
import {UgyfelContainerMode} from '../../ugyfel/ugyfelcontainermode';
import {ZoomSources} from '../../enums/zoomsources';
import {BizonylatSzerkesztesMode} from '../bizonylatszerkesztesmode';
import {FizetesimodService} from '../../fizetesimod/fizetesimod.service';
import {FizetesimodContainerMode} from '../../fizetesimod/fizetesimodcontainermode';
import {BizonylatContainerMode} from '../bizonylatcontainermode';
import {BizonylatEgyMode} from '../bizonylategymode';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {BizonylattetelSzerkesztesMode} from '../bizonylattetelszerkesztesmode';

@Component({
  selector: 'app-bizonylat-szerkesztes',
  templateUrl: './bizonylat-szerkesztes.component.html',
  styleUrls: ['./bizonylat-szerkesztes.component.css']
})
export class BizonylatSzerkesztesComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  bizonylatservice: BizonylatService;
  eppFrissit = false;
  fizerr = 'Ismeretlen fizetési mód: ';

  constructor(private _ugyfelservice: UgyfelService,
              private _penznemservice: PenznemService,
              private _fizetesimodservice: FizetesimodService,
              bizonylatservice: BizonylatService) {
    this.bizonylatservice = bizonylatservice;
  }

  UgyfelZoom() {
    this._ugyfelservice.szempont = 0;
    this._ugyfelservice.minta = this.bizonylatservice.ComplexDtoEdited.Dto.UGYFELNEV || '';
    this._ugyfelservice.zoomsource = ZoomSources.Bizonylat;
    this._ugyfelservice.zoom = true;
    this._ugyfelservice.ContainerMode = UgyfelContainerMode.List;

    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.UgyfelZoom;
  }
  PenznemZoom() {
    this._penznemservice.ekDto.minta = this.bizonylatservice.ComplexDtoEdited.Dto.PENZNEM || '';
    this._penznemservice.zoomsource = ZoomSources.Bizonylat;
    this._penznemservice.zoom = true;
    this._penznemservice.ContainerMode = PenznemContainerMode.List;

    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.PenznemZoom;
  }
  FizetesimodZoom() {
    this._fizetesimodservice.ekDto.minta = this.bizonylatservice.ComplexDtoEdited.Dto.FIZETESIMOD || '';
    this._fizetesimodservice.zoomsource = ZoomSources.Bizonylat;
    this._fizetesimodservice.zoom = true;
    this._fizetesimodservice.ContainerMode = FizetesimodContainerMode.List;

    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.FizetesimodZoom;
  }

  Fiztool(fm: string) {
    this.eppFrissit = true;
    this._fizetesimodservice.Read(fm)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        if (res.Result.length !== 1) {
          throw this.fizerr + fm;
        }

        this.bizonylatservice.ComplexDtoEdited.Dto.FIZETESIMODKOD = res.Result[0].FIZETESIMODKOD;
        this.bizonylatservice.ComplexDtoEdited.Dto.FIZETESIMOD = res.Result[0].FIZETESIMOD1;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  Bk() {
    this.Fiztool('Bankkártya');
  }
  Kp() {
    this.Fiztool('Készpénz');
  }

  tetelUj() {
    this.eppFrissit = true;
    this.bizonylatservice.CreateNewTetel(this.bizonylatservice.bizonylatTipus)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.bizonylatservice.TetelDtoEdited = res.Result[0];
        this.eppFrissit = false;

        this.bizonylatservice.teteluj = true;
        this.bizonylatservice.Setszvesz();

        this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.TetelSzerkesztes;
        this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  tetelTorles(i: number) {
    // TODO törölni szó nélkül?
  }
  tetelModositas(i: number) {
    this.bizonylatservice.TetelDtoSelectedIndex = i;
    this.bizonylatservice.teteluj = false;
    this.bizonylatservice.Setszvesz();

    this.bizonylatservice.TetelDtoEdited = Object.assign({}, this.bizonylatservice.ComplexDtoEdited.LstTetelDto[i]);
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.TetelSzerkesztes;
    this.bizonylatservice.TetelSzerkesztesMode = BizonylattetelSzerkesztesMode.Blank;
  }

  onSubmit() {}
  cancel() {
    if (this.bizonylatservice.uj) {
      this.bizonylatservice.ContainerMode = BizonylatContainerMode.List;
    } else {
      this.bizonylatservice.EgyMode = BizonylatEgyMode.Reszletek;
    }
  }
}
