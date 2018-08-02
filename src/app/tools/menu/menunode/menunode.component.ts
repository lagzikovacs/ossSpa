import {Component, Input, OnInit} from '@angular/core';
import {AngularmenuDto} from '../../../dtos/menu/angularmenudto';

@Component({
  selector: 'app-menunode',
  templateUrl: './menunode.component.html',
  styleUrls: ['./menunode.component.css']
})
export class MenunodeComponent implements OnInit {
  @Input() menunode: AngularmenuDto;

  constructor() { }

  ngOnInit() {
  }
}
