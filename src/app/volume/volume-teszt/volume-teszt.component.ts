import {Component, OnDestroy, ViewChild} from '@angular/core';
import {VolumeService} from '../volume.service';
import {ErrormodalComponent} from '../../errormodal/errormodal.component';
import {DokumentumService} from '../../dokumentum/dokumentum.service';

@Component({
  selector: 'app-volume-teszt',
  templateUrl: './volume-teszt.component.html'
})
export class VolumeTesztComponent implements OnDestroy {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  volumeservice: VolumeService;
  dokumentumservice: DokumentumService;
  index = 0;
  hibalista: string[];
  eppFrissit = false;

  constructor(volumeservice: VolumeService,
              dokumentumservice: DokumentumService) {
    this.volumeservice = volumeservice;
    this.dokumentumservice = dokumentumservice;
  }

  inditas() {
    this.index = 0;
    this.hibalista = new Array<string>();
    this.volumeservice.eppTesztel = true;

    this.ciklus();
  }

  ciklus() {
    this.dokumentumservice.Ellenorzes(this.volumeservice.dbv[this.index])
      .then(res => {
        if (res.Error != null) {
          this.hibalista.push(this.volumeservice.dbv[this.index] + ': ' + res.Error);
        }
        // TODO: lejárt sid esetén nem kéne folytatni

        this.next();
      })
      .catch(err => {
        this.hibalista.push(this.volumeservice.dbv[this.index] + ': ' + err);
        this.next();
      });
  }
  next() {
    if (this.volumeservice.eppTesztel) {
      if (++this.index < this.volumeservice.dbv.length) {
        this.ciklus();
      } else {
        this.leallitas();
      }
    }
  }

  leallitas() {
    this.volumeservice.eppTesztel = false;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
