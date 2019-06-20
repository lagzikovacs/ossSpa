import {Component, OnDestroy} from '@angular/core';
import {ProjektService} from '../projekt/projekt.service';
import {b64toBlob} from '../tools/b64toBlob';
import * as FileSaver from 'file-saver';
import {IratmintaService} from './iratminta.service';
import {rowanimation} from '../animation/rowAnimation';
import {ErrorService} from '../tools/errorbox/error.service';
import {SpinnerService} from '../tools/spinner/spinner.service';

@Component({
  selector: 'app-projekt-iratminta',
  templateUrl: './projekt-iratminta.component.html',
  animations: [rowanimation]
})
export class ProjektIratmintaComponent implements OnDestroy {
  private _eppFrissit = false;
  get eppFrissit(): boolean {
    return this._eppFrissit;
  }
  set eppFrissit(value: boolean) {
    this._eppFrissit = value;
    this._spinnerservice.Run = value;
  }

  constructor(private _projektservice: ProjektService,
              private _iratmintaservice: IratmintaService,
              private _spinnerservice: SpinnerService,
              private _errorservice: ErrorService) {
  }

  szerzodes() {
    this.eppFrissit = true;
      this._iratmintaservice.Szerzodes(this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Szerződés.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  szallitasiszerzodes() {
    this.eppFrissit = true;
    this._iratmintaservice.Szallitasiszerzodes(this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Szállítási szerződés.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  feltetelesszerzodes() {
    this.eppFrissit = true;
    this._iratmintaservice.Feltetelesszerzodes(this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Feltételes szerződés.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  munkalap() {
    this.eppFrissit = true;
    this._iratmintaservice.Munkalap(this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Munkalap.docx');

        return this._projektservice.Get(this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this._projektservice.Dto[this._projektservice.DtoSelectedIndex] = res1.Result[0];
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  elegedettseg() {
    this.eppFrissit = true;
    this._iratmintaservice.Elegedettseg(this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Elégedettségi felmérés.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  elmuemasz() {
    this.eppFrissit = true;
    this._iratmintaservice.KeszrejelentesElmuEmasz(this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Készrejelentés Elmű/Émász.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  eon() {
    this.eppFrissit = true;
    this._iratmintaservice.KeszrejelentesEon(this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Készrejelentés Eon.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  demasz() {
    this.eppFrissit = true;
    this._iratmintaservice.KeszrejelentesNkm(this._projektservice.Dto[this._projektservice.DtoSelectedIndex].Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Készrejelentés Démász.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
