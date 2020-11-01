import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ElectronService} from '../@core/electron.service';
import {UserItemDialogComponent} from '../dialogs/users/user-item-dialog/user-item-dialog.component';
import {MakePassword} from '../@core/utils';

@Component({
    selector: 'app-password-cards',
    templateUrl: './password-cards.component.html',
    styleUrls: ['./password-cards.component.scss'],
})
export class PasswordCardsComponent implements OnInit {
    electron: any;
    fs: any;
    fileExtension = '.pg';
    searchText: any;
    cards: any[] = [];

    constructor(public dialog: MatDialog,
                private electronService: ElectronService) {
    }

    ngOnInit(): void {
        if (this.electronService.isElectron) {
            console.log('Run in electron');
            this.electron = this.electronService.electron;
            this.fs = this.electronService.fs;
        } else {
            console.log('Browser');
        }
    }

    get cardItems() {
        if (!this.searchText) {
            return this.cards;
        }
        console.debug(this.searchText);
        return this.cards.filter(f => f.site.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
            || f.comment.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1);
    }

    addItem() {
        const dialogRef = this.dialog.open(UserItemDialogComponent, {
            height: 'auto',
            width: '40%',
            data: {
                title: 'New password info',
                item: {
                    site: '',
                    value: MakePassword.generateWithOptions({
                        length: 10,
                        digits: false,
                        special: false,
                    }),
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
                    {name: 'User configuration', extensions: [this.fileExtension]},
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
