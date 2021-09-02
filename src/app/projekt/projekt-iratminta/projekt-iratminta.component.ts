import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {b64toBlob} from '../../tools/b64toBlob';
import * as FileSaver from 'file-saver';
import {IratmintaService} from './iratminta.service';
import {rowanimation} from '../../animation/rowAnimation';
import {ErrorService} from '../../tools/errorbox/error.service';

@Component({
  selector: 'app-projekt-iratminta',
  templateUrl: './projekt-iratminta.component.html',
  animations: [rowanimation]
})
export class ProjektIratmintaComponent implements OnDestroy {
  @Input() Projektkod = -1;
  @Output() eventMunkalaputan = new EventEmitter<void>();

  eppFrissit = false;

  constructor(private _iratmintaservice: IratmintaService,
              private _errorservice: ErrorService) {
  }

  szerzodes() {
    this.eppFrissit = true;
      this._iratmintaservice.Szerzodes(this.Projektkod)
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
    this._iratmintaservice.Szallitasiszerzodes(this.Projektkod)
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
    this._iratmintaservice.Feltetelesszerzodes(this.Projektkod)
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
  oftszerzodes() {
    this.eppFrissit = true;
    this._iratmintaservice.OFTszerzodes(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'OFT szerződés.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  hmketulajdonoshozzajarulas() {
    this.eppFrissit = true;
    this._iratmintaservice.HMKEtulajdonoshozzajarulas(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'HMKE tulajdonos hozzájárulás.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  munkalap() {
    this.eppFrissit = true;
    this._iratmintaservice.Munkalap(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Munkalap.docx');
        this.eppFrissit = false;

        this.eventMunkalaputan.emit();
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  elegedettseg() {
    this.eppFrissit = true;
    this._iratmintaservice.Elegedettseg(this.Projektkod)
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
    this._iratmintaservice.KeszrejelentesElmuEmasz(this.Projektkod)
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
    this._iratmintaservice.KeszrejelentesEon(this.Projektkod)
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
  mvm() {
    this.eppFrissit = true;
    this._iratmintaservice.KeszrejelentesMvm(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Készrejelentés MVM.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  eonelmu() {

  }
  mvmemasz() {

  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
