import {Component, ViewChild} from '@angular/core';
import {ProjektService} from '../projekt.service';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {b64toBlob} from '../../../tools/b64toBlob';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-projekt-iratminta',
  templateUrl: './projekt-iratminta.component.html',
  styleUrls: ['./projekt-iratminta.component.css']
})
export class ProjektIratmintaComponent {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  projektservice: ProjektService;
  eppFrissit = false;

  constructor(projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  szerzodes() {
    this.eppFrissit = true;
      this.projektservice.Szerzodes(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
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
    this.projektservice.Szallitasiszerzodes(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
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
  munkalap() {
    this.eppFrissit = true;
    this.projektservice.Munkalap(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result);
        FileSaver.saveAs(blob, 'Munkalap.docx');

        return this.projektservice.Get(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.projektservice.Dto[this.projektservice.DtoSelectedIndex] = res1.Result[0];
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  elegedettseg() {
    this.eppFrissit = true;
    this.projektservice.Elegedettseg(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
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
    this.projektservice.KeszrejelentesElmuEmasz(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
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
    this.projektservice.KeszrejelentesEon(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
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
    this.projektservice.KeszrejelentesDemasz(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
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
}
