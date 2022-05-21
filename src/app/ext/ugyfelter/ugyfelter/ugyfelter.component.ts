import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {UgyfelterService} from '../ugyfelter.service';
import {UgyfelterDto} from '../ugyfelterdto';
import {ProjektkapcsolatService} from '../../../02 Eszkozok/01 Projekt/projektkapcsolat/projektkapcsolat.service';
import {LogonService} from '../../../05 Segedeszkozok/05 Bejelentkezes/logon.service';
import {UgyfelDto} from '../../../01 Torzsadatok/09 Ugyfel/ugyfeldto';
import {ProjektDto} from '../../../02 Eszkozok/01 Projekt/projekt/projektdto';
import {ProjektKapcsolatDto} from '../../../02 Eszkozok/01 Projekt/projektkapcsolat/projektkapcsolatdto';
import {DokumentumDto} from '../../../02 Eszkozok/02 Irat/dokumentum/dokumentumdto';
import {DokumentumService} from '../../../02 Eszkozok/02 Irat/dokumentum/dokumentum.service';
import {Szempont} from '../../../common/enums/szempont';
import {BizonylatnyomtatasService} from '../../../03 Bizonylatok/bizonylatnyomtatas/bizonylatnyomtatas.service';
import {SzMT} from '../../../common/dtos/szmt';
import {BizonylatNyomtatasTipus} from '../../../03 Bizonylatok/bizonylatnyomtatas/bizonylatnyomtatastipus';
import * as FileSaver from 'file-saver';
import {b64toBlob} from '../../../common/b64toBlob';
import {LetoltesParam} from '../../../02 Eszkozok/02 Irat/dokumentum/letoltesparam';
import {ErrorService} from '../../../common/errorbox/error.service';
import {Bizonylatnyomtatasciklus} from '../../../03 Bizonylatok/bizonylatnyomtatas/bizonylatnyomtatasciklus';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
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
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

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
              private _cdr: ChangeDetectorRef,
              private _errorservice: ErrorService) {
    this.bc = new Bizonylatnyomtatasciklus(_errorservice, _bizonylatnyomtatasservice);
    this.bc.eventSpinnervege.on(() => {
      this.spinner = false;
    });
  }

  ngOnInit() {
    this._sub = this._route
      .queryParams
      .subscribe(params => {
        this.up = params['up'] || '';
      });
  }

  async folytatas() {
    this.spinner = true;
    try {
      const res = await this._ugyfelterservice.UgyfelterCheck(this.up);
      if (res.Error !== null) {
        throw res.Error;
      }

      this.Dto = res.Result;
      this._logonservice.Sid = res.Result.sid;
      this.ugyfelDto = res.Result.ugyfelDto;
      this.lstProjektDto = res.Result.lstProjektDto;

      this.bejelentkezve = true;
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  async projektvalasztas(i: number) {
    this.projektkod = this.lstProjektDto[i].Projektkod;
    this.iratkod = 0;
    this.dokumentumkod = 0;

    this.spinner = true;
    try {
      const res = await this._projektkapcsolatservice.SelectForUgyfelter(this.projektkod);
      if (res.Error !== null) {
        throw res.Error;
      }

      this.lstProjektkapcsolatDto = res.Result;

      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  async bizonylatvalasztas(i: number) {
    this.bizonylatkod = this.lstProjektkapcsolatDto[i].Bizonylatkod;
    this.iratkod = 0;
    this.dokumentumkod = 0;

    this.bc.fajlnev = this.lstProjektkapcsolatDto[i].Azonosito + ' ' + this.lstProjektkapcsolatDto[i].Tipus + '.pdf';

    const fi = [
      new SzMT(Szempont.BizonylatKod, this.bizonylatkod),
      new SzMT(Szempont.NyomtatasTipus, BizonylatNyomtatasTipus.Masolat)
    ];

    this.spinner = true;
    try {
      const res = await this._bizonylatnyomtatasservice.TaskStart(fi);
      if (res.Error != null) {
        throw res.Error;
      }

      this.bc.tasktoken = res.Result;
      this.bc.ciklus();
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  async iratvalasztas(i: number) {
    this.bizonylatkod = 0;
    this.iratkod = this.lstProjektkapcsolatDto[i].Iratkod;
    this.dokumentumkod = 0;

    this.spinner = true;
    try {
      const res = await this._dokumentumservice.Select(this.iratkod);
      if (res.Error !== null) {
        throw res.Error;
      }

      this.lstDokumentumDto = res.Result;

      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  async dokumentumvalasztas(i: number) {
    this.dokumentumkod = this.lstDokumentumDto[i].Dokumentumkod;

    const meret = this.lstDokumentumDto[i].Meret;
    const megjegyzes = this.lstDokumentumDto[i].Megjegyzes;
    const ext = this.lstDokumentumDto[i].Ext.toLowerCase();

    this.spinner = true;
    if (ext !== '.doc' && ext !== '.docx' && ext !== '.xls' && ext !== '.xlsx') {
      try {
        const res = await this._dokumentumservice.Letoltes(new LetoltesParam(this.dokumentumkod, meret));
        if (res.Error !== null) {
          throw res.Error;
        }

        const blob = b64toBlob(res.Result.b);
        FileSaver.saveAs(blob, megjegyzes + ext);

        this.spinner = false;
      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    } else {
      try {
        const res1 = await this._dokumentumservice.LetoltesPDF(this.dokumentumkod);
        if (res1.Error !== null) {
          throw res1.Error;
        }

        const blob = b64toBlob(res1.Result);
        FileSaver.saveAs(blob, megjegyzes + '.pdf');

        this.spinner = false;

      } catch (err) {
        this.spinner = false;
        this._errorservice.Error = err;
      }
    }
  }

  ngOnDestroy() {
    this._sub.unsubscribe();

    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
