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
  jog = false;
  nincsProjekt = false;

  @Output() eventTorlesutan = new EventEmitter<void>();

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
    this.jog = _logonservice.Jogaim.includes(JogKod[JogKod.UGYFELEKMOD]);
    this.ugyfelservice = ugyfelservice;
  }

  doReszletek() {
    this.egymode = EgyMode.Reszletek;
  }
  doTorles() {
    this.egymode = EgyMode.Torles;
  }
  doModositas() {
    this.egymode = EgyMode.Modositas;
  }
  doCsoport() {
    this.egymode = EgyMode.Csoport;
  }
  doProjekt() {
    this.egymode = EgyMode.Projekt;
  }
  doUgyfelterlink() {
    this.egymode = EgyMode.UgyfelterLink;
  }
  doVcard() {
    this.egymode = EgyMode.Vcard;
  }

  onTorles(ok: boolean) {
    if (ok) {
      this.eppFrissit = true;

      this.ugyfelservice.Delete(this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex])
        .then(res => {
          if (res.Error != null) {
            throw res.Error;
          }

          this.ugyfelservice.Dto.splice(this.ugyfelservice.DtoSelectedIndex, 1);
          this.ugyfelservice.DtoSelectedIndex = -1;

          this.eppFrissit = false;
          this.eventTorlesutan.emit();
        })
        .catch(err => {
          this.eppFrissit = false;
          this._errorservice.Error = err;
        });
    } else {
      this.egymode = EgyMode.Reszletek;
    }
  }

  onModositaskesz() {
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
