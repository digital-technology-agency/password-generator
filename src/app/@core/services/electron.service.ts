import {Injectable} from '@angular/core';
import {ipcRenderer, webFrame, remote} from 'electron';
import * as fs from 'fs';

@Injectable({
    providedIn: 'root',
})
export class ElectronService {

    electron: typeof Electron;
    crypto: any;
    speake: any;
    electronTray: any;
    electronNotification: any;
    electronUpdater: any;
    ipcRenderer: typeof ipcRenderer;
    webFrame: typeof webFrame;
    remote: typeof remote;
    fs: typeof fs;
    appVersion: any;

    constructor() {
        if (this.isElectron) {
            this.electron = window.require('electron');
            this.crypto = window.require('crypto');
            this.speake = window.require('speakeasy');
            this.ipcRenderer = this.electron.ipcRenderer;
            this.webFrame = this.electron.webFrame;
            this.fs = window.require('fs');
            this.appVersion = this.electron.remote.app.getVersion();
            this.electronUpdater = this.electron.remote.autoUpdater;
            console.debug('version: ', this.appVersion);
            console.debug('crypto: ', this.crypto);
            this.electronNotification = new this.electron.remote.Notification({
                title: 'Title',
                body: 'Notification from the Renderer process'
            });
            console.debug('tray: ', this.electronTray);
            console.debug('notification: ', this.electronNotification);
        }
    }

    get isElectron(): boolean {
        return !!(window && window.process && window.process.type);
    }
}
