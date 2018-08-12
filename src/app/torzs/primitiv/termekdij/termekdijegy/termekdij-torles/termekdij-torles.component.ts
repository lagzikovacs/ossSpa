import {Component, OnInit, ViewChild} from '@angular/core';
import {TermekdijService} from '../../../../../services/torzs/primitiv/termekdij.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ErrormodalComponent} from '../../../../../tools/errormodal/errormodal.component';

@Component({
  selector: 'app-termekdij-torles',
  templateUrl: './termekdij-torles.component.html',
  styleUrls: ['./termekdij-torles.component.css']
})
export class TermekdijTorlesComponent implements OnInit {
  @ViewChild(ErrormodalComponent) errormodal: ErrormodalComponent;

  termekdijservice: TermekdijService;
  eppFrissit = false;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              termekdijservice: TermekdijService) {
    this.termekdijservice = termekdijservice;
  }

  ngOnInit() {
    if (this.termekdijservice.DtoSelectedIndex === -1) {
      this._router.navigate(['../blank'], {relativeTo: this._route});
    }
  }

  ok() {
    this.eppFrissit = true;
    this.termekdijservice.Delete(this.termekdijservice.Dto[this.termekdijservice.DtoSelectedIndex])
      .then(res => {
        if (res.Error != null) {
          throw res.Error;
        }

        this.termekdijservice.Dto.splice(this.termekdijservice.DtoSelectedIndex, 1);
        this.termekdijservice.DtoSelectedIndex = -1;

        this.eppFrissit = false;
        this._router.navigate(['../../termekdij'], {relativeTo: this._route});
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
