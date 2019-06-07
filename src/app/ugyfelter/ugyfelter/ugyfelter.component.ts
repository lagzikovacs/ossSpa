import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UgyfelterService} from '../ugyfelter.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {UgyfelterDto} from '../ugyfelterdto';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {LogonService} from '../../logon/logon.service';
import {UgyfelDto} from '../../ugyfel/ugyfeldto';
import {ProjektDto} from '../../projekt/projektdto';
import {ProjektKapcsolatDto} from '../../projektkapcsolat/projektkapcsolatdto';
import {DokumentumDto} from '../../dokumentum/dokumentumdto';
import {DokumentumService} from '../../dokumentum/dokumentum.service';
import {Szempont} from '../../enums/szempont';
import {BizonylatnyomtatasService} from '../../bizonylatnyomtatas/bizonylatnyomtatas.service';
import {SzMT} from '../../dtos/szmt';
import {BizonylatNyomtatasTipus} from '../../bizonylatnyomtatas/bizonylatnyomtatastipus';
import * as FileSaver from 'file-saver';
import {b64toBlob} from '../../tools/b64toBlob';
import {LetoltesParam} from '../../dokumentum/letoltesparam';

@Component({
  selector: 'app-ugyfelter',
  templateUrl: './ugyfelter.component.html'
})
export class UgyfelterComponent implements OnInit, OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  up: string;
  private _sub: any;
  bejelentkezve = false;
  eppFrissit = false;
  Dto = new UgyfelterDto();
  pi = -1;

  ugyfelDto = new UgyfelDto();
  lstProjektDto: ProjektDto[];
  lstProjektkapcsolatDto: ProjektKapcsolatDto[];
  lstDokumentumDto: DokumentumDto[];

  projektkod = 0;
  bizonylatkod = 0;
  bizonylatnev = '';
  iratkod = 0;
  dokumentumkod = 0;
  tasktoken = '';
  szamlalo: any;

  constructor(private _route: ActivatedRoute,
              private _logonservice: LogonService,
              private _ugyfelterservice: UgyfelterService,
              private _projektkapcsolatservice: ProjektkapcsolatService,
              private _bizonylatnyomtatasservice: BizonylatnyomtatasService,
              private _dokumentumservice: DokumentumService) { }

  ngOnInit() {
    this._sub = this._route
      .queryParams
      .subscribe(params => {
        this.up = params['up'] || '';
      });
  }

  folytatas() {
    this.eppFrissit = true;
    this._ugyfelterservice.UgyfelterCheck(this.up)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.Dto = res.Result;
        this._logonservice.Sid = res.Result.sid;
        this.ugyfelDto = res.Result.ugyfelDto;
        this.lstProjektDto = res.Result.lstProjektDto;

        this.bejelentkezve = true;
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  projektvalasztas(i: number) {
    this.projektkod = this.lstProjektDto[i].Projektkod;
    this.iratkod = 0;
    this.dokumentumkod = 0;

    this.eppFrissit = true;
    this._projektkapcsolatservice.SelectForUgyfelter(this.projektkod)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.lstProjektkapcsolatDto = res.Result;

        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  bizonylatvalasztas(i: number) {
    this.bizonylatkod = this.lstProjektkapcsolatDto[i].Bizonylatkod;
    this.bizonylatnev = this.lstProjektkapcsolatDto[i].Azonosito + ' ' + this.lstProjektkapcsolatDto[i].Tipus + '.pdf';
    this.iratkod = 0;
    this.dokumentumkod = 0;

    const fi = [
      new SzMT(Szempont.BizonylatKod, this.bizonylatkod),
      new SzMT(Szempont.NyomtatasTipus, BizonylatNyomtatasTipus.Masolat)
    ];

    this.eppFrissit = true;
    this._bizonylatnyomtatasservice.TaskStart(fi)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.tasktoken = res.Result;
        this.bizonylatnyomtatasciklus();
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  bizonylatnyomtatasciklus() {
    this._bizonylatnyomtatasservice.TaskCheck(this.tasktoken)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        if (res.Status === 'Error') {
          throw new Error('Hm... ' + res.Error);
        }
        if (res.Status === 'Queued' || res.Status === 'Running') {
          this.szamlalo = setInterval(() => { this.bizonylatnyomtatasciklusnext(); }, 1000);
        }

        if (res.Status === 'Completed') {
          const blob = b64toBlob(res.Riport);
          FileSaver.saveAs(blob, this.bizonylatnev);
          this.eppFrissit = false;
        }
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  bizonylatnyomtatasciklusnext() {
    clearInterval(this.szamlalo);

    this.bizonylatnyomtatasciklus();
  }

  iratvalasztas(i: number) {
    this.bizonylatkod = 0;
    this.iratkod = this.lstProjektkapcsolatDto[i].Iratkod;
    this.dokumentumkod = 0;

    this.eppFrissit = true;
    this._dokumentumservice.Select(this.iratkod)
      .then(res => {
        if (res.Error !== null) {
          throw res.Error;
        }

        this.lstDokumentumDto = res.Result;

        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  dokumentumvalasztas(i: number) {
    this.dokumentumkod = this.lstDokumentumDto[i].Dokumentumkod;

    const meret = this.lstDokumentumDto[i].Meret;
    const megjegyzes = this.lstDokumentumDto[i].Megjegyzes;
    const ext = this.lstDokumentumDto[i].Ext.toLowerCase();

    this.eppFrissit = true;
    if (ext !== '.doc' && ext !== '.docx' && ext !== '.xls' && ext !== '.xlsx') {
      this._dokumentumservice.Letoltes(new LetoltesParam(
        this.dokumentumkod, meret))
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          const blob = b64toBlob(res.Result.b);
          FileSaver.saveAs(blob, megjegyzes + ext);

          this.eppFrissit = false;
        })
        .catch(err => {
          this.errormodal.show(err);
          this.eppFrissit = false;
        });
    } else {
      this._dokumentumservice.LetoltesPDF(this.dokumentumkod)
        .then(res => {
          if (res.Error !== null) {
            throw res.Error;
          }

          const blob = b64toBlob(res.Result);
          FileSaver.saveAs(blob, megjegyzes + '.pdf');

          this.eppFrissit = false;
        })
        .catch(err => {
          this.errormodal.show(err);
          this.eppFrissit = false;
        });
    }
  }

  ngOnDestroy() {
    this._sub.unsubscribe();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
