import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {UserItemDialogComponent} from './user-item-dialog/user-item-dialog.component';
import {MakePassword} from './@core/utils';
import {ElectronService} from './@core/electron.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    electron: any;
    fs: any;
    footerText = 'version: ';
    fileExtension = '.pg';
    cards: any[] = [];
    searchText: any;

    constructor(public dialog: MatDialog,
                private electronService: ElectronService) {
    }

    ngOnInit() {
        if (this.electronService.isElectron) {
            console.log('Run in electron');
            this.electron = this.electronService.electron;
            this.fs = this.electronService.fs;
            this.footerText = `version: ${this.electronService.appVersion}`;
        } else {
            console.log('Run in browser');
        }
    }

    ngOnDestroy() {
    }

    get cardItems() {
        if (!this.searchText) {
            return this.cards;
        }
        console.debug(this.searchText);
        return this.cards.filter(f => f.site.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
            || f.comment.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1);
    }

    openActualVersion(){
        this.electron.shell.openExternal(`https://github.com/digital-technology-agency/password-generator/releases/latest`)
    }

    addItem() {
        const dialogRef = this.dialog.open(UserItemDialogComponent, {
            data: {
                title: 'New password info',
                item: {
                    site: '',
                    value: MakePassword.generate(10),
                    comment: '',
                },
            },
        });
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.cards.push(result);
            }
        });
    }

    generate() {
        console.debug('Hello');
    }

    removeItem(item: any) {
        const index = this.cards.indexOf(item, 0);
        if (index > -1) {
            this.cards.splice(index, 1);
        }
    }

    load() {
        this.electron.remote.dialog.showOpenDialog(
            {
                properties: ['openFile'],
                filters: [
                    {name: 'User configuration', extensions: ['pg']},
                    {name: 'All Files', extensions: ['*']},
                ],
            },
        ).then(file => {
            if (!file.canceled) {
                this.cards = JSON.parse(this.fs.readFileSync(file.filePaths[0], 'utf8', function (err, data) {
                    if (err) return null;
                    return data;
                }));
            }
        }).catch(err => {
            console.debug(err);
        })
    }

    save() {
        this.electron.remote.dialog.showSaveDialog({
                properties: ['createDirectory', 'showOverwriteConfirmation'],
                filters: [
                    {name: 'User configuration', extensions: ['pg']},
                    {name: 'All Files', extensions: ['*']},
                ],
                defaultPath: `userData${this.fileExtension}`,
            },
        ).then(file => {
            if (!file.canceled) {
                this.fs.writeFileSync(file.filePath.toString(), JSON.stringify(this.cards), (err) => {
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
