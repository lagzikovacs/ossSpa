import {Component, ElementRef, ViewChild} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {DokumentumContainerMode} from '../dokumentumcontainermode';
import {b64toBlob} from '../../../tools/b64toBlob';
import {FajlBuf} from '../fajlbuf';
import {ErrormodalComponent} from "../../../errormodal/errormodal.component";
import {IratService} from "../../irat/irat.service";

@Component({
  selector: 'app-dokumentum-feltoltes',
  templateUrl: './dokumentum-feltoltes.component.html',
  styleUrls: ['./dokumentum-feltoltes.component.css']
})
export class DokumentumFeltoltesComponent {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  dokumentumservice: DokumentumService;
  eppFrissit = false;

  file: any;
  file64: any;

  constructor(private _iratservice: IratService,
              dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.file64 = reader.result.split(',')[1];
      };
    }
  }

  onSubmit() {
    const fb = new FajlBuf();
    fb.b = this.file64;
    fb.Meret = this.file.size;
    fb.Megjegyzes = this.file.name;
    fb.IratKod = this._iratservice.Dto[this._iratservice.DtoSelectedIndex].IRATKOD;

    this.dokumentumservice.FeltoltesAngular(fb)
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        return this.dokumentumservice.Get(res.Result);
      })
      .then(res1 => {
        if (res1.Error != null) {
          throw res1.Error;
        }

        this.dokumentumservice.Dto.unshift(res1.Result[0]);

        this.eppFrissit = false;
        this.navigal();
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.dokumentumservice.ContainerMode = DokumentumContainerMode.List;
  }
}
