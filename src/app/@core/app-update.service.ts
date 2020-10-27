import { Injectable } from '@angular/core';
declare var updater: any;

@Injectable({
  providedIn: 'root'
})
export class AppUpdateService {

  constructor() { }

  checkForUpdates() {
    const res = updater.autoUpdater();
    console.log(res);
  }
}
