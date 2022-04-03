import {Component, Input, OnDestroy} from '@angular/core';
import {UgyfelDto} from '../../01 Torzsadatok/09 Ugyfel/ugyfeldto';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-ugyfel-vcard',
  templateUrl: './ugyfel-vcard.component.html'
})
export class UgyfelVcardComponent implements OnDestroy {
  @Input() Dto = new UgyfelDto();

  letoltesClick() {
    const encode = 'ENCODING=QUOTED-PRINTABLE;CHARSET=utf-8:';

    const Ceg = this.Dto.Ceg ? this.Dto.Ceg : ';';
    const Beosztas = this.Dto.Beosztas ? this.Dto.Beosztas : '';

    const raw = 'BEGIN:VCARD\r\n' +
      'VERSION:2.1\r\n' +
      'FN;' + encode + this.Dto.Nev + '\r\n' +
      'N;' + encode + this.Dto.Nev + ';;;\r\n' +
      'ORG;' + encode + Ceg + '\r\n' +
      'TITLE;' + encode + Beosztas + '\r\n' +
      'ADR;WORK;PREF;' + encode + ';;' + this.Dto.Kozterulet + ' ' +
      this.Dto.Kozterulettipus + ' ' + this.Dto.Hazszam + ';' +
      this.Dto.Helysegnev + ';;' + this.Dto.Iranyitoszam + '\r\n' +
      'EMAIL:' + this.Dto.Email + '\r\n' +
      'TEL;TYPE=CELL:' + this.Dto.Telefon + '\r\n' +
      'END:VCARD';

    const arrayUTF8 = this.toUTF8Array(raw);
    const byteNumbers = new Uint8Array(arrayUTF8.length);
    for (let i = 0; i < arrayUTF8.length; i++) {
      byteNumbers[i] = arrayUTF8[i];
    }

    const blob = new Blob([byteNumbers], {type: 'text/html;charset=UTF-8;'});
    FileSaver.saveAs(blob, this.Dto.Nev + '.vcf');
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
