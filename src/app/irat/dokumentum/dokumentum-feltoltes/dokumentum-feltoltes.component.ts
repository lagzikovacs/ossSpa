import {Component, ElementRef, ViewChild} from '@angular/core';
import {DokumentumService} from '../dokumentum.service';
import {DokumentumContainerMode} from "../dokumentumcontainermode";

@Component({
  selector: 'app-dokumentum-feltoltes',
  templateUrl: './dokumentum-feltoltes.component.html',
  styleUrls: ['./dokumentum-feltoltes.component.css']
})
export class DokumentumFeltoltesComponent {
  @ViewChild('fileInput') fileInput: ElementRef;

  dokumentumservice: DokumentumService;
  eppFrissit = false;

  filebol: any;

  constructor(dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.filebol = reader.result.split(',')[1];
        console.log(file.name);
        console.log(file.type);
        console.log(file.size);
        console.log(this.filebol);
      };
    }
  }

  onSubmit() {
    this.navigal();
  }
  cancel() {
    this.navigal();
  }
  navigal() {
    this.dokumentumservice.ContainerMode = DokumentumContainerMode.List;
  }
}
