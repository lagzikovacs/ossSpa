import {Component, OnDestroy, ViewChild} from '@angular/core';
import {ProjektService} from '../projekt/projekt.service';
import {ErrormodalComponent} from '../errormodal/errormodal.component';
import {b64toBlob} from '../tools/b64toBlob';
import * as FileSaver from 'file-saver';
import {IratmintaService} from './iratminta.service';
import {rowanimation} from '../animation/rowAnimation';

@Component({
  selector: 'app-projekt-iratminta',
  templateUrl: './projekt-iratminta.component.html',
  animations: [rowanimation]
})
export class ProjektIratmintaComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  eppFrissit = false;

  constructor(private _projektservice: ProjektService,
              private _iratmintaservice: IratmintaService) {
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
        this.errormodal.show(err);
        this.eppFrissit = false;
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
        this.errormodal.show(err);
        this.eppFrissit = false;
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
        this.errormodal.show(err);
        this.eppFrissit = false;
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
        this.errormodal.show(err);
        this.eppFrissit = false;
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
        this.errormodal.show(err);
        this.eppFrissit = false;
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
        this.errormodal.show(err);
        this.eppFrissit = false;
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
        this.errormodal.show(err);
        this.eppFrissit = false;
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
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
