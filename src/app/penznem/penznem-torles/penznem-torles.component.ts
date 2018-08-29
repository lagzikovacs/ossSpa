import {Component, OnInit, ViewChild} from '@angular/core';
import {PenznemService} from '../penznem.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-penznem-torles',
  templateUrl: './penznem-torles.component.html',
  styleUrls: ['./penznem-torles.component.css']
})
export class PenznemTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  penznemservice: PenznemService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              penznemservice: PenznemService) {
    this.penznemservice = penznemservice;
  }

  ngOnInit() {
    if (this.penznemservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.penznemservice.Delete(this.penznemservice.Dto[this.penznemservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.penznemservice.Dto.splice(this.penznemservice.DtoSelectedIndex, 1);
        this.penznemservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../penznem-list'], {relativeTo: this._route});
      })
      .catch(err => {
        this.errormodal.show(err);
        this.eppFrissit = false;
      });
  }
  cancel() {
    this._router.navigate(['../blank'], {relativeTo: this._route});
  }
}
