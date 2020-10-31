import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {NewRsaCertComponent} from '../dialogs/certs/new-rsa-cert/new-rsa-cert.component';
import {ElectronService} from '../@core/electron.service';

@Component({
    selector: 'app-certificates',
    templateUrl: './certificates.component.html',
    styleUrls: ['./certificates.component.scss'],
})
export class CertificatesComponent implements OnInit {

    constructor(public dialog: MatDialog,
                private electron: ElectronService) {
    }

    ngOnInit(): void {
    }

    createRsa() {
        const dialogRef = this.dialog.open(NewRsaCertComponent, {
            height: 'auto',
            width: '100%',
            data: {
                title: 'Create certificate',
                item: {
                    certData: this.electron.crypto.generateKeyPairSync("rsa", {modulusLength: 2048}),
                },
            },
        });
    }
}
