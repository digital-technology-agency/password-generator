import {Injectable} from '@angular/core';
import {ElectronService} from './electron.service';

@Injectable({
    providedIn: 'root',
})
export class Auth2faService {
    speakeasy: any;
    fs: any;
    setting2FaFile = '2fa.setting';
    secretData: any;
    secret: any = {secret32: null};

    constructor(private electronService: ElectronService) {
        this.speakeasy = this.electronService.speake;
        this.fs = this.electronService.fs;
        if (this.exist2fa) {
            const read2FaSetting = this.fs.readFileSync(this.setting2FaFile, 'utf8', function (err, data) {
                if (err) return undefined;
                return data;
            });
            this.secret = JSON.parse(read2FaSetting);
        }
    }

    public verifed(input: number) {
        return this.speakeasy.totp.verify({
            secret: this.secret.secret32,
            encoding: 'base32',
            token: `${input}`,
        });
    }

    public newSecret(options: any) {
        this.secretData = this.speakeasy.generateSecret(options);
        this.secret = this.secretData.base32;
    }

    public saveSettings(secret: any) {
        if (secret) {
            this.fs.writeFileSync(this.setting2FaFile, JSON.stringify(secret), (err) => {
                if (err) {
                    console.debug("An error ocurred creating the file " + err.message);
                }
                console.debug("Saved : ", secret);
            });
        }
    }

    public get exist2fa() {
        return this.fs.existsSync(this.setting2FaFile)
    }
}
