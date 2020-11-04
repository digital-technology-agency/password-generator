import {Injectable} from '@angular/core';
import {ipcRenderer, webFrame, remote, autoUpdater} from 'electron';
import * as fs from 'fs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ElectronService {

    electron: typeof Electron;
    crypto: any;
    speake: any;
    electronTray: any;
    electronNotification: any;
    electronUpdater: typeof autoUpdater;
    ipcRenderer: typeof ipcRenderer;
    webFrame: typeof webFrame;
    remote: typeof remote;
    fs: typeof fs;
    appVersion: any;

    constructor(private http: HttpClient) {
        if (this.isElectron) {
            this.electron = window.require('electron');
            this.crypto = window.require('crypto');
            this.speake = window.require('speakeasy');
            this.ipcRenderer = this.electron.ipcRenderer;
            this.webFrame = this.electron.webFrame;
            this.fs = window.require('fs');
            this.appVersion = this.electron.remote.app.getVersion();
            this.electronUpdater = this.electron.remote.autoUpdater;
            /*this.electronUpdater = window.require('electron-updater').autoUpdater;*/
            console.debug('version: ', this.appVersion);
            console.debug('crypto: ', this.crypto);
            this.electronNotification = new this.electron.remote.Notification({
                title: 'Title',
                body: 'Notification from the Renderer process',
            });
            console.debug('tray: ', this.electronTray);
            console.debug('notification: ', this.electronNotification);
        }
    }

    public get<T>(url: string): Observable<T> {
        const httpHeaders = new HttpHeaders({
            'Accept': 'application/vnd.github.v3+json',
        });
        return this.http.get<T>(url, {headers: httpHeaders});
    }

    get isElectron(): boolean {
        return !!(window && window.process && window.process.type);
    }
}
