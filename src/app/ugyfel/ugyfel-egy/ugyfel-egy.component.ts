import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {UgyfelService} from '../ugyfel.service';
import {LogonService} from '../../logon/logon.service';
import {JogKod} from '../../enums/jogkod';
import {UgyfelContainerMode} from '../ugyfelcontainermode';
import {UgyfelEgyMode} from '../ugyfelegymode';
import {rowanimation} from '../../animation/rowAnimation';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-ugyfel-egy',
  templateUrl: './ugyfel-egy.component.html',
  animations: [rowanimation]
})
export class UgyfelEgyComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  ugyfelservice: UgyfelService;
  mod = false;
  eppFrissit = false;
  nincsProjekt = false;
  ri = -1;

  constructor(private _logonservice: LogonService,
              ugyfelservice: UgyfelService) {
    this.mod = _logonservice.Jogaim.includes(JogKod[JogKod.UGYFELEKMOD]);
    this.ugyfelservice = ugyfelservice;
  }

  vissza() {
    this.ugyfelservice.ContainerMode = UgyfelContainerMode.List;
  }
  reszletek() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Reszletek;
  }
  torles() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Torles;
  }
  modositas() {
    this.ugyfelservice.uj = false;
    this.ugyfelservice.DtoEdited = Object.assign({}, this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex]);
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Modositas;
  }
  csoport() {
    this.ugyfelservice.uj = false;
    this.ugyfelservice.DtoEdited = Object.assign({}, this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex]);
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Csoport;
  }
  projekt() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Projekt;
  }
  ugyfelterlink() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.UgyfelterLink;
  }
  vcard() {
    this.ugyfelservice.uj = false;
    this.ugyfelservice.DtoEdited = Object.assign({}, this.ugyfelservice.Dto[this.ugyfelservice.DtoSelectedIndex]);
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Vcard;
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
        this.ugyfelservice.ContainerMode = UgyfelContainerMode.List;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  TorlesCancel() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Reszletek;
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
        this.ugyfelservice.EgyMode = UgyfelEgyMode.Reszletek;
      })
      .catch(err => {
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }

  CsoportCancel() {
    this.ugyfelservice.EgyMode = UgyfelEgyMode.Reszletek;
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
