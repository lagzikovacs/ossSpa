import {Component, OnInit, ViewChild} from '@angular/core';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';
import {VolumeService} from '../../services/volume.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-volume',
  templateUrl: './volume.component.html',
  styleUrls: ['./volume.component.css']
})
export class VolumeComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  eppFrissit = false;
  volumeservice: VolumeService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              volumeservice: VolumeService) {
    this.volumeservice = volumeservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.volumeservice.elsokereses = true;
    this.volumeservice.ekDto.rekordtol = 0;

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.volumeservice.Read()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.volumeservice.elsokereses) {
          this.volumeservice.Dto = res.Result;
          this.volumeservice.elsokereses = false;
        } else {
          const buf = [...this.volumeservice.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.volumeservice.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }

  selectforzoom(i: number) {
    this.setClickedRow(i);
  }

  setClickedRow(i: number) {
    this.volumeservice.DtoSelectedIndex = i;
    this.volumeservice.uj = false;
    this._router.navigate(['../volumeegy'], {relativeTo: this._route});
  }
}
