import {Component, ElementRef, OnDestroy, ViewChild} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {DokumentumContainerMode} from '../dokumentumcontainermode';
import {FajlBuf} from '../fajlbuf';
import {ErrormodalComponent} from '../../../errormodal/errormodal.component';
import {IratService} from '../../irat/irat.service';

@Component({
  selector: 'app-dokumentum-feltoltes',
  templateUrl: './dokumentum-feltoltes.component.html',
  styleUrls: ['./dokumentum-feltoltes.component.css']
})
export class DokumentumFeltoltesComponent implements OnDestroy {
  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  dokumentumservice: DokumentumService;
  eppFrissit = false;

  file: any;
  file64: any;
  fajlnev = '';
  megjegyzes = '';
  imageSrc: string;

  constructor(private _iratservice: IratService,
              dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.fajlnev = this.file.name;
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imageSrc = reader.result as string;
        this.file64 = (reader.result as string).split(',')[1];
      };
    }
  }

  onSubmit() {
    const fb = new FajlBuf();
    fb.b = this.file64;
    fb.Fajlnev = this.fajlnev;
    fb.Meret = this.file.size;
    fb.Megjegyzes = this.megjegyzes;
    fb.IratKod = this._iratservice.Dto[this._iratservice.DtoSelectedIndex].IRATKOD;

    this.eppFrissit = true;
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
        this.eppFrissit = false;
        this.errormodal.show(err);
      });
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.dokumentumservice.ContainerMode = DokumentumContainerMode.List;
  }
  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
