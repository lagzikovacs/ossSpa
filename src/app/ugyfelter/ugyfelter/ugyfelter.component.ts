import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UgyfelterService} from '../ugyfelter.service';
import {UgyfelterDto} from '../ugyfelterdto';
import {ProjektkapcsolatService} from '../../projektkapcsolat/projektkapcsolat.service';
import {LogonService} from '../../logon/logon.service';
import {UgyfelDto} from '../../ugyfel/ugyfeldto';
import {ProjektDto} from '../../projekt/projektdto';
import {ProjektKapcsolatDto} from '../../projektkapcsolat/projektkapcsolatdto';
import {DokumentumDto} from '../../dokumentum/dokumentumdto';
import {DokumentumService} from '../../dokumentum/dokumentum.service';
import {Szempont} from '../../common/enums/szempont';
import {BizonylatnyomtatasService} from '../../bizonylatnyomtatas/bizonylatnyomtatas.service';
import {SzMT} from '../../common/dtos/szmt';
import {BizonylatNyomtatasTipus} from '../../bizonylatnyomtatas/bizonylatnyomtatastipus';
import * as FileSaver from 'file-saver';
import {b64toBlob} from '../../tools/b64toBlob';
import {LetoltesParam} from '../../dokumentum/letoltesparam';
import {ErrorService} from '../../tools/errorbox/error.service';
import {Bizonylatnyomtatasciklus} from '../../bizonylatnyomtatas/bizonylatnyomtatasciklus';

@Component({
  selector: 'app-ugyfelter',
  templateUrl: './ugyfelter.component.html'
})
export class UgyfelterComponent implements OnInit, OnDestroy {
  bc: Bizonylatnyomtatasciklus;

  up: string;
  private _sub: any;
  bejelentkezve = false;
  Dto = new UgyfelterDto();
  pi = -1;
  eppFrissit = false;

  ugyfelDto = new UgyfelDto();
  lstProjektDto: ProjektDto[];
  lstProjektkapcsolatDto: ProjektKapcsolatDto[];
  lstDokumentumDto: DokumentumDto[];

  projektkod = 0;
  bizonylatkod = 0;
  iratkod = 0;
  dokumentumkod = 0;

  constructor(private _route: ActivatedRoute,
              private _logonservice: LogonService,
              private _ugyfelterservice: UgyfelterService,
              private _projektkapcsolatservice: ProjektkapcsolatService,
              private _bizonylatnyomtatasservice: BizonylatnyomtatasService,
              private _dokumentumservice: DokumentumService,
              private _errorservice: ErrorService) {
    this.bc = new Bizonylatnyomtatasciklus(_errorservice, _bizonylatnyomtatasservice);
    this.bc.eventSpinnervege.on(() => {
      this.eppFrissit = false;
    });
  }

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
        this.eppFrissit = false;
        this._errorservice.Error = err;
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
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  bizonylatvalasztas(i: number) {
    this.bizonylatkod = this.lstProjektkapcsolatDto[i].Bizonylatkod;
    this.iratkod = 0;
    this.dokumentumkod = 0;

    this.bc.fajlnev = this.lstProjektkapcsolatDto[i].Azonosito + ' ' + this.lstProjektkapcsolatDto[i].Tipus + '.pdf';

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

        this.bc.tasktoken = res.Result;
        this.bc.ciklus();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
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
        this.eppFrissit = false;
        this._errorservice.Error = err;
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
          this.eppFrissit = false;
          this._errorservice.Error = err;
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
          this.eppFrissit = false;
          this._errorservice.Error = err;
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
