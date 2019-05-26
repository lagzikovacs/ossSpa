import {Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {TeendoService} from '../teendo.service';
import {JogKod} from '../../enums/jogkod';
import {LogonService} from '../../logon/logon.service';
import {ZoomSources} from '../../enums/zoomsources';
import {ProjektteendoService} from '../../projekt/projektteendo/projektteendo.service';
import {TeendoContainerMode} from '../teendocontainermode';
import {TeendoEgyMode} from '../teendoegymode';
import {ProjektteendoSzerkesztesMode} from '../../projekt/projektteendo/projektteendoszerkesztesmode';

@Component({
  selector: 'app-teendo-list',
  templateUrl: './teendo-list.component.html',
  styleUrls: ['./teendo-list.component.css']
})
export class TeendoListComponent implements OnInit, OnDestroy {

  constructor(private _logonservice: LogonService,
              teendoservice: TeendoService,
              private _projektteendoservice: ProjektteendoService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.PRIMITIVEKMOD]);
    this.teendoservice = teendoservice;
  }
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  szurok = ['Teendő'];

  eppFrissit = false;
  mod = false;
  teendoservice: TeendoService;

  @Input() selectedindex: number;
  @Output() selectedindexChange = new EventEmitter<number>();

  ngOnInit() {
    if (this.teendoservice.zoom) {
      this.onKereses();
    }
  }

  RowClick(i: number) {
    this.selectedindexChange.emit(i);
    console.log(i);
    console.log(this.selectedindex);
  }

  onKereses() {
    this.teendoservice.elsokereses = true;
    this.teendoservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.teendoservice.Read(this.teendoservice.ekDto.minta)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.teendoservice.elsokereses) {
          this.teendoservice.Dto = res.Result;
          this.teendoservice.elsokereses = false;
        } else {
          const buf = [...this.teendoservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.teendoservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    if (this.teendoservice.zoomsource === ZoomSources.Projektteendo) {
      this._projektteendoservice.DtoEdited.Teendokod = this.teendoservice.Dto[i].Teendokod;
      this._projektteendoservice.DtoEdited.Teendo = this.teendoservice.Dto[i].Teendo1;

      this.stopzoom();
    }
  }
  stopzoom() {
    this.teendoservice.zoom = false;

    if (this.teendoservice.zoomsource === ZoomSources.Projektteendo) {
      this._projektteendoservice.SzerkesztesMode = ProjektteendoSzerkesztesMode.Blank;
    }
  }

  setClickedRow(i: number) {
    this.teendoservice.DtoSelectedIndex = i;
    this.teendoservice.uj = false;
    this.teendoservice.ContainerMode = TeendoContainerMode.Egy;
    this.teendoservice.EgyMode = TeendoEgyMode.Reszletek;
  }

  uj() {
    this.eppFrissit = true;
    this.teendoservice.CreateNew()
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.teendoservice.uj = true;
        this.teendoservice.DtoEdited = res.Result[0];
        this.teendoservice.DtoSelectedIndex = -1;
        this.eppFrissit = false;

        this.teendoservice.ContainerMode = TeendoContainerMode.Uj;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
