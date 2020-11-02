import {Injectable} from '@angular/core';
import {ElectronService} from './electron.service';

@Injectable({
    providedIn: 'root',
})
export class SettingsService {

    fs: any;
    settingFile = 'manager.set';
    settings: any = {
        secret32: null,
    };


    constructor(private electronService: ElectronService) {
        this.fs = this.electronService.fs;
        this.loadData();
    }

    public loadData() {
        if (this.exist) {
            const readSetting = this.fs.readFileSync(this.settingFile, 'utf8', function (err, data) {
                if (err) return undefined;
                return data;
            });
            this.settings = JSON.parse(readSetting);
        }
    }

    public saveData(data: any) {
        if (data) {
            this.fs.writeFileSync(this.settingFile, JSON.stringify(data), (err) => {
                if (err) {
                    console.debug("An error ocurred creating the file " + err.message);
                }
                console.debug("Saved : ", data);
            });
        }
    }

    public get exist() {
        return this.fs.existsSync(this.settingFile)
    }
}
