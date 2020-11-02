import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewRsaCertComponent} from '../dialogs/certs/new-rsa-cert/new-rsa-cert.component';
import {ElectronService} from '../@core/services/electron.service';

@Component({
    selector: 'app-certificates',
    templateUrl: './certificates.component.html',
    styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {

    certificates: any[] = [];
    searchText: any;
    fs: any;
    fileExtension = '.certs';
    electron: any;

    constructor(public dialog: MatDialog,
                private electronService: ElectronService) {
    }

    ngOnInit(): void {
        this.fs = this.electronService.fs;
        this.electron = this.electronService.electron;
    }

    get cardCertificates() {
        if (!this.searchText) {
            return this.certificates;
        }
        console.debug(this.searchText);
        return this.certificates.filter(f => f.site.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
            || f.comment.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1);
    }

    createRsa() {
        const dialogRef = this.dialog.open(NewRsaCertComponent, {
            height: 'auto',
            width: '100%',
            data: {
                title: 'Create certificate',
                item: {
                    name: '',
                    site: '',
                    certData: this.electronService.crypto.generateKeyPairSync("rsa", {modulusLength: 2048}),
                },
            },
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                result.publicData = result.certData.publicKey.export({
                    type: "pkcs1",
                    format: "pem",
                });
                result.privateData = result.certData.privateKey.export({
                    type: "pkcs1",
                    format: "pem",
                });
                this.certificates.push(result);
                console.debug('Add cert: ', result);
            }
        });
    }

    save() {
        this.electron.remote.dialog.showSaveDialog({
                properties: ['createDirectory', 'showOverwriteConfirmation'],
                filters: [
                    {name: 'User configuration', extensions: [this.fileExtension]},
                    {name: 'All Files', extensions: ['*']},
                ],
                defaultPath: `certificates${this.fileExtension}`,
            },
        ).then(file => {
            if (!file.canceled) {
                this.fs.writeFileSync(file.filePath.toString(), JSON.stringify(this.certificates), (err) => {
                    if (err) {
                        console.debug("An error ocurred creating the file " + err.message);
                    }
                    console.debug("The file has been succesfully saved");
                });
            }
        }).catch(err => {
            console.debug(err);
        })
    }
}
