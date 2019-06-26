import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {UgyfelService} from '../ugyfel.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {rowanimation} from '../../animation/rowAnimation';
import * as FileSaver from 'file-saver';
import {deepCopy} from '../../tools/deepCopy';
import {ErrorService} from '../../tools/errorbox/error.service';
import {SpinnerService} from '../../tools/spinner/spinner.service';
import {EgyMode} from '../../enums/egymode';

@Component({
  selector: 'app-ugyfel-egy',
  templateUrl: './ugyfel-egy.component.html',
  animations: [rowanimation]
})
export class UgyfelEgyComponent implements OnDestroy {
  egymode = EgyMode.Reszletek;
  ugyfelservice: UgyfelService;
  mod = false;
  nincsProjekt = false;
  ri = -1;

  @Output() torlesutan = new EventEmitter<void>();

  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _logonservice: LogonService,
              private _errorservice: ErrorService,
              private _spinnerservice: SpinnerService,
              ugyfelservice: UgyfelService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.UGYFELEKMOD]);
    this.ugyfelservice = ugyfelservice;
  }

  reszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  torles() {
    this.egymode = EgyMode.Torles;
  }
  modositas() {
    this.ugyfelservice.uj = false;
    this.ugyfelservice.DtoEdited = deepCopy(this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Modositas;
  }
  csoport() {
    this.ugyfelservice.uj = false;
    this.ugyfelservice.DtoEdited = deepCopy(this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Csoport;
  }
  projekt() {
    this.egymode = EgyMode.Projekt;
  }
  ugyfelterlink() {
    this.egymode = EgyMode.UgyfelterLink;
  }
  vcard() {
    this.ugyfelservice.uj = false;
    this.ugyfelservice.DtoEdited = deepCopy(this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex]);
    this.egymode = EgyMode.Vcard;
  }

  TorlesOk() {
    this.eppFrissit = true;
    this.ugyfelservice.Delete(this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.ugyfelservice.Dto.splice(this.ugyfelservice.DtoSelectedIndex, 1);
        this.ugyfelservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this.torlesutan.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  TorlesCancel() {
    this.egymode = EgyMode.Reszletek;
  }

  EgyReszletek() {
    this.egymode = EgyMode.Reszletek;
  }

  CsoportOk(selected: number) {
    this.eppFrissit = true;

    this.ugyfelservice.DtoEdited.Csoport = selected;
    this.ugyfelservice.Update(this.ugyfelservice.DtoEdited)
      .then(res1 => {
        if (res1.Error !== null) {
          throw res1.Error;
        }

        return this.ugyfelservice.Get(res1.Result);
      })
      .then(res2 => {
        if (res2.Error !== null) {
          throw res2.Error;
        }

        this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex] = res2.Result[0];

        this.eppFrissit = false;
        this.egymode = EgyMode.Reszletek;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  CsoportCancel() {
    this.egymode = EgyMode.Reszletek;
  }

  VcardLetoles() {
    const encode = 'ENCODING=QUOTED-PRINTABLE;CHARSET=utf-8:';

    const Ceg = this.ugyfelservice.DtoEdited.Ceg ? this.ugyfelservice.DtoEdited.Ceg : ';';
    const Beosztas = this.ugyfelservice.DtoEdited.Beosztas ? this.ugyfelservice.DtoEdited.Beosztas : '';

    const raw = 'BEGIN:VCARD\r\n' +
      'VERSION:2.1\r\n' +
      'FN;' + encode + this.ugyfelservice.DtoEdited.Nev + '\r\n' +
      'N;' + encode + this.ugyfelservice.DtoEdited.Nev + ';;;\r\n' +
      'ORG;' + encode + Ceg + '\r\n' +
      'TITLE;' + encode + Beosztas + '\r\n' +
      'ADR;WORK;PREF;' + encode + ';;' + this.ugyfelservice.DtoEdited.Kozterulet + ' ' +
        this.ugyfelservice.DtoEdited.Kozterulettipus + ' ' + this.ugyfelservice.DtoEdited.Hazszam + ';' +
        this.ugyfelservice.DtoEdited.Helysegnev + ';;' + this.ugyfelservice.DtoEdited.Iranyitoszam + '\r\n' +
      'EMAIL:' + this.ugyfelservice.DtoEdited.Email + '\r\n' +
      'TEL;TYPE=CELL:' + this.ugyfelservice.DtoEdited.Telefon + '\r\n' +
      'END:VCARD';

    const arrayUTF8 = this.toUTF8Array(raw);
    const byteNumbers = new Uint8Array(arrayUTF8.length);
    for (let i = 0; i < arrayUTF8.length; i++) {
      byteNumbers[i] = arrayUTF8[i];
    }

    const blob = new Blob([byteNumbers], {type: 'text/html;charset=UTF-8;'});
    FileSaver.saveAs(blob, this.ugyfelservice.DtoEdited.Nev + '.vcf');
  }

  toUTF8Array(str) {
    const utf8 = [];
    for (let i = 0; i < str.length; i++) {
      let charcode = str.charCodeAt(i);
      if (charcode < 0x80) {
        utf8.push(charcode);
      } else if (charcode < 0x800) {
        utf8.push(0xc0 | (charcode >> 6),
          0x80 | (charcode & 0x3f));
      } else if (charcode < 0xd800 || charcode >= 0xe000) {
        utf8.push(0xe0 | (charcode >> 12),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      } else {
        i++;
        charcode = 0x10000 + (((charcode & 0x3ff) << 10)
          | (str.charCodeAt(i) & 0x3ff));
        utf8.push(0xf0 | (charcode >> 18),
          0x80 | ((charcode >> 12) & 0x3f),
          0x80 | ((charcode >> 6) & 0x3f),
          0x80 | (charcode & 0x3f));
      }
    }
    return utf8;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
