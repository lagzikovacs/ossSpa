import { Component } from '@angular/core';
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

@Component({
  selector: 'app-bizonylat-szerkesztes',
  templateUrl: './bizonylat-szerkesztes.component.html',
  styleUrls: ['./bizonylat-szerkesztes.component.css']
})
export class BizonylatSzerkesztesComponent {
  bizonylatservice: BizonylatService;
  eppFrissit = false;

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

  tetelUj() {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.TetelSzerkesztes;
  }
  tetelTorles(i: number) {
  }
  tetelModositas(i: number) {
    this.bizonylatservice.SzerkesztesMode = BizonylatSzerkesztesMode.TetelSzerkesztes;
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
