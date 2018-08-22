import {Component, ViewChild} from '@angular/core';
import {ProjektService} from '../../../../services/eszkoz/projekt.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../tools/errormodal/errormodal.component';
import {b64toBlob} from '../../../../tools/b64toBlob';
import {BlobContentType} from '../../../../enums/blobcontentType';
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

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              projektservice: ProjektService) {
    this.projektservice = projektservice;
  }

  szerzodes() {
    this.projektservice.Szerzodes(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result, BlobContentType.Docx);
        FileSaver.saveAs(blob, 'Szerződés.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  szallitasiszerzodes() {
    this.projektservice.Szallitasiszerzodes(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result, BlobContentType.Docx);
        FileSaver.saveAs(blob, 'Szállítási szerződés.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  munkalap() {
    this.projektservice.Munkalap(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result, BlobContentType.Docx);
        FileSaver.saveAs(blob, 'Munkalap.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  elegedettseg() {
    this.projektservice.Elegedettseg(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result, BlobContentType.Docx);
        FileSaver.saveAs(blob, 'Elégedettségi felmérés.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  elmuemasz() {
    this.projektservice.KeszrejelentesElmuEmasz(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result, BlobContentType.Docx);
        FileSaver.saveAs(blob, 'Készrejelentés Elmű/Émász.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  eon() {
    this.projektservice.KeszrejelentesEon(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result, BlobContentType.Docx);
        FileSaver.saveAs(blob, 'Készrejelentés Eon.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  demasz() {
    this.projektservice.KeszrejelentesDemasz(this.projektservice.Dto[this.projektservice.DtoSelectedIndex].PROJEKTKOD)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }
        const blob = b64toBlob(res.Result, BlobContentType.Docx);
        FileSaver.saveAs(blob, 'Készrejelentés Démász.docx');
        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
}
