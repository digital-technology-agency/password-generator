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
    updateUrl: any;

    constructor() {
        if (this.isElectron) {
            this.ipcRenderer = window.require('electron').ipcRenderer;
            this.electron = window.require('electron');
            this.webFrame = window.require('electron').webFrame;
            this.fs = window.require('fs');
            this.appVersion = window.require('electron').remote.app.getVersion();
            this.updateUrl = 'https://github.com/digital-technology-agency/password-generator/releases/latest';
            console.debug('Version: ', this.appVersion);
        }
    }

    get isElectron(): boolean {
        return !!(window && window.process && window.process.type);
    }
}
