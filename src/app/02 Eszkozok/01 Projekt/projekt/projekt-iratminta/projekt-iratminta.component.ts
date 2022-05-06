import {
  ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy,
  Output
} from '@angular/core';
import {b64toBlob} from '../../../../common/b64toBlob';
import * as FileSaver from 'file-saver';
import {IratmintaService} from './iratminta.service';
import {ErrorService} from '../../../../common/errorbox/error.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-projekt-iratminta',
  templateUrl: './projekt-iratminta.component.html'
})
export class ProjektIratmintaComponent implements OnDestroy {
  @Input() Projektkod = -1;
  @Output() eventMunkalaputan = new EventEmitter<void>();

  eppFrissit = false;
  set spinner(value: boolean) {
    this.eppFrissit = value;
    this._cdr.markForCheck();
    this._cdr.detectChanges();
  }

  constructor(private _iratmintaservice: IratmintaService,
              private _cdr: ChangeDetectorRef,
              private _errorservice: ErrorService) {
  }

  async szerzodes() {
    this.spinner = true;
    try {
      const res = await this._iratmintaservice.Szerzodes(this.Projektkod);
      if (res.Error != null) {
        throw res.Error;
      }
      const blob = b64toBlob(res.Result);
      FileSaver.saveAs(blob, 'Szerződés.docx');
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }
  async szallitasiszerzodes() {
    this.spinner = true;
    try {
      const res = await this._iratmintaservice.Szallitasiszerzodes(this.Projektkod);
      if (res.Error != null) {
        throw res.Error;
      }
      const blob = b64toBlob(res.Result);
      FileSaver.saveAs(blob, 'Szállítási szerződés.docx');
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }
  async feltetelesszerzodes() {
    this.spinner = true;
    try {
      const res = await this._iratmintaservice.Feltetelesszerzodes(this.Projektkod);
      if (res.Error != null) {
        throw res.Error;
      }
      const blob = b64toBlob(res.Result);
      FileSaver.saveAs(blob, 'Feltételes szerződés.docx');
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }
  async oftszerzodes() {
    this.spinner = true;
    try {
      const res = await this._iratmintaservice.OFTszerzodes(this.Projektkod);
      if (res.Error != null) {
        throw res.Error;
      }
      const blob = b64toBlob(res.Result);
      FileSaver.saveAs(blob, 'OFT szerződés.docx');
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }
  async hmketulajdonoshozzajarulas() {
    this.spinner = true;
    try {
      const res = await this._iratmintaservice.HMKEtulajdonoshozzajarulas(this.Projektkod);
      if (res.Error != null) {
        throw res.Error;
      }
      const blob = b64toBlob(res.Result);
      FileSaver.saveAs(blob, 'HMKE tulajdonos hozzájárulás.docx');
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }
  async munkalap() {
    this.spinner = true;
    try {
      const res = await this._iratmintaservice.Munkalap(this.Projektkod);
      if (res.Error != null) {
        throw res.Error;
      }
      const blob = b64toBlob(res.Result);
      FileSaver.saveAs(blob, 'Munkalap.docx');
      this.spinner = false;

      this.eventMunkalaputan.emit();
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }
  async elegedettseg() {
    this.spinner = true;
    try {
      const res = await this._iratmintaservice.Elegedettseg(this.Projektkod);
      if (res.Error != null) {
        throw res.Error;
      }
      const blob = b64toBlob(res.Result);
      FileSaver.saveAs(blob, 'Elégedettségi felmérés.docx');
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }
  async elmuemasz() {
    this.spinner = true;
    try {
      const res = await this._iratmintaservice.KeszrejelentesElmuEmasz(this.Projektkod);
      if (res.Error != null) {
        throw res.Error;
      }
      const blob = b64toBlob(res.Result);
      FileSaver.saveAs(blob, 'Készrejelentés Elmű/Émász.docx');
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }
  async eon() {
    this.spinner = true;
    try {
      const res = await this._iratmintaservice.KeszrejelentesEon(this.Projektkod);
      if (res.Error != null) {
        throw res.Error;
      }
      const blob = b64toBlob(res.Result);
      FileSaver.saveAs(blob, 'Készrejelentés Eon.docx');
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }
  async mvm() {
    this.spinner = true;
    try {
      const res = await this._iratmintaservice.KeszrejelentesMvm(this.Projektkod);
      if (res.Error != null) {
        throw res.Error;
      }
      const blob = b64toBlob(res.Result);
      FileSaver.saveAs(blob, 'Készrejelentés MVM.docx');
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }
  async eonelmu() {
    this.spinner = true;
    try {
      const res = await this._iratmintaservice.KeszrejelentesEonelmu(this.Projektkod);
      if (res.Error != null) {
        throw res.Error;
      }
      const blob = b64toBlob(res.Result);
      FileSaver.saveAs(blob, 'Készrejelentés EON/ELMÜ.docx');
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }
  async mvmemasz() {
    this.spinner = true;
    try {
      const res = await this._iratmintaservice.KeszrejelentesMvmemasz(this.Projektkod);
      if (res.Error != null) {
        throw res.Error;
      }
      const blob = b64toBlob(res.Result);
      FileSaver.saveAs(blob, 'Készrejelentés MVM/ÉMÁSZ.docx');
      this.spinner = false;
    } catch (err) {
      this.spinner = false;
      this._errorservice.Error = err;
    }
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
