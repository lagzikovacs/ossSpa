import { Injectable } from '@angular/core';
import {VagolapDto} from './vagolapdto';
import {VagolapMode} from "./vagolapmode";

@Injectable({
  providedIn: 'root'
})
export class VagolapService {
  cim = 'Vágólap';
  Dto = new Array<VagolapDto>();
  Mode = VagolapMode.List;

  constructor() { }
}
