import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
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
  @Input() Projektkod = -1;
  @Output() eventMunkalaputan = new EventEmitter<void>();

  spinnerservice: SpinnerService;

  constructor(private _iratmintaservice: IratmintaService,
              private _errorservice: ErrorService,
              spinnerservice: SpinnerService) {
    this.spinnerservice = spinnerservice;
  }

  szerzodes() {
    this.spinnerservice.eppFrissit = true;
      this._iratmintaservice.Szerzodes(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Szerződés.docx');
        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  szallitasiszerzodes() {
    this.spinnerservice.eppFrissit = true;
    this._iratmintaservice.Szallitasiszerzodes(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Szállítási szerződés.docx');
        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  feltetelesszerzodes() {
    this.spinnerservice.eppFrissit = true;
    this._iratmintaservice.Feltetelesszerzodes(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Feltételes szerződés.docx');
        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  munkalap() {
    this.spinnerservice.eppFrissit = true;
    this._iratmintaservice.Munkalap(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Munkalap.docx');
        this.spinnerservice.eppFrissit = false;

        this.eventMunkalaputan.emit();
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  elegedettseg() {
    this.spinnerservice.eppFrissit = true;
    this._iratmintaservice.Elegedettseg(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Elégedettségi felmérés.docx');
        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  elmuemasz() {
    this.spinnerservice.eppFrissit = true;
    this._iratmintaservice.KeszrejelentesElmuEmasz(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Készrejelentés Elmű/Émász.docx');
        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  eon() {
    this.spinnerservice.eppFrissit = true;
    this._iratmintaservice.KeszrejelentesEon(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Készrejelentés Eon.docx');
        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  demasz() {
    this.spinnerservice.eppFrissit = true;
    this._iratmintaservice.KeszrejelentesNkm(this.Projektkod)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Készrejelentés Démász.docx');
        this.spinnerservice.eppFrissit = false;
      })
      .catch(err => {
        this.spinnerservice.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
