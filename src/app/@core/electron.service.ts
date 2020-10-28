import {Injectable} from '@angular/core';
import {ipcRenderer, webFrame, remote} from 'electron';
import * as fs from 'fs';

@Injectable({
    providedIn: 'root',
})
export class ElectronService {

    electron: typeof Electron;
    electronUpdater: any;
    ipcRenderer: typeof ipcRenderer;
    webFrame: typeof webFrame;
    remote: typeof remote;
    fs: typeof fs;
    appVersion: any;

    constructor() {
        if (this.isElectron) {
            this.electron = window.require('electron');
            this.ipcRenderer = this.electron.ipcRenderer;
            this.webFrame = this.electron.webFrame;
            this.fs = window.require('fs');
            this.appVersion = this.electron.remote.app.getVersion();
            this.electronUpdater = this.electron.remote.autoUpdater;
            console.debug('version: ', this.appVersion);
        }
    }

    get isElectron(): boolean {
        return !!(window && window.process && window.process.type);
    }
}
