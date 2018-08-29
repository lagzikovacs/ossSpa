import {Component, OnInit, ViewChild} from '@angular/core';
import {FizetesimodService} from '../fizetesimod.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-fizetesimod-torles',
  templateUrl: './fizetesimod-torles.component.html',
  styleUrls: ['./fizetesimod-torles.component.css']
})
export class FizetesimodTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  fizetesimodservice: FizetesimodService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              fizetesimodservice: FizetesimodService) {
    this.fizetesimodservice = fizetesimodservice;
  }

  ngOnInit() {
    if (this.fizetesimodservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.fizetesimodservice.Delete(this.fizetesimodservice.Dto[this.fizetesimodservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.fizetesimodservice.Dto.splice(this.fizetesimodservice.DtoSelectedIndex, 1);
        this.fizetesimodservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../fizetesimod-list'], {relativeTo: this._route});
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
