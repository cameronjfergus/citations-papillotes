import {Injectable} from '@angular/core';

@Injectable()
export class Device {
  isMobile(): boolean
  {
    return navigator.userAgent.includes('Mobile');
  }

  isDesktop(): boolean
  {
    return !this.isMobile();
  }
}
