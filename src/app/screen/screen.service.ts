import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface ScreenDimension {
  ScreenHeight: number;
  ScreenWidth: number;
}

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  private ScreenSizeSource = new BehaviorSubject<ScreenDimension>({ScreenHeight: 0 , ScreenWidth: 0});
  currentScreenSize = this.ScreenSizeSource.asObservable();

  constructor() { }

  changeScreenSize(size: ScreenDimension) {
    this.ScreenSizeSource.next(size);
  }
}
