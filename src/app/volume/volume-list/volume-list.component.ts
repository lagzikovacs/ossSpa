import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {VolumeService} from '../volume.service';
import {ErrorService} from '../../tools/errorbox/error.service';
import {TablaComponent} from '../../tools/tabla/tabla.component';
import {environment} from '../../../environments/environment';
import {EgyszeruKeresesDto} from '../../dtos/egyszerukeresesdto';
import {VolumeDto} from '../volumedto';
import {rowanimation} from '../../animation/rowAnimation';
import {EgyMode} from '../../enums/egymode';

@Component({
  selector: 'app-volume-list',
  templateUrl: './volume-list.component.html',
  animations: [rowanimation]
})
export class VolumeListComponent implements OnInit, OnDestroy {
  @ViewChild('tabla', {static: true}) tabla: TablaComponent;

  ekDto = new EgyszeruKeresesDto(0, '', environment.lapmeret);
  elsokereses = true;
  eppFrissit = false;

  Dto = new Array<VolumeDto>();
  DtoSelectedIndex = -1;

  egymode = EgyMode.Reszletek;

  volumeservice: VolumeService;

  constructor(private _errorservice: ErrorService,
              volumeservice: VolumeService) {
    this.volumeservice = volumeservice;
  }

  ngOnInit() {
    this.onKereses();
  }

  onKereses() {
    this.elsokereses = true;
    this.ekDto.rekordtol = 0;

    this.tabla.clearselections();

    this.onKeresesTovabb();
  }

  onKeresesTovabb() {
    this.eppFrissit = true;
    this.volumeservice.Read()
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        if (this.elsokereses) {
          this.Dto = res.Result;
          this.elsokereses = false;
        } else {
          const buf = [...this.Dto];
          res.Result.forEach(element => {
            buf.push(element);
          });
          this.Dto = buf;
        }

        this.eppFrissit = false;
      })
      .catch(err => {
        this.eppFrissit = false;
        this._errorservice.Error = err;
      });
  }

  onId(i: number) {
    this.DtoSelectedIndex = i;
    this.egymode = EgyMode.Reszletek;
  }

  doNav(i: number) {
    this.egymode = i;
  }

  ngOnDestroy() {
    Object.keys(this).map(k => {
      (this[k]) = null;
    });
  }
}
