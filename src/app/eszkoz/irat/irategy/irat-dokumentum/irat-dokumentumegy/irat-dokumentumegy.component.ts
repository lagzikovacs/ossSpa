import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DokumentumService} from '../../../../../services/dokumentum.service';

@Component({
  selector: 'app-irat-dokumentumegy',
  templateUrl: './irat-dokumentumegy.component.html',
  styleUrls: ['./irat-dokumentumegy.component.css']
})
export class IratDokumentumegyComponent implements OnInit {
  dokumentumservice: DokumentumService;

  constructor(private _router: Router,
              private _route: ActivatedRoute,
              dokumentumservice: DokumentumService) {
    this.dokumentumservice = dokumentumservice;
  }

  ngOnInit() {
  }

  vissza() {
    this._router.navigate(['../dokumentum'], {relativeTo: this._route});
  }
  letoltes() {
    this._router.navigate(['letoltes'], {relativeTo: this._route});
  }
  torles() {
    this._router.navigate(['torles'], {relativeTo: this._route});
  }
}
