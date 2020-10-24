import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig, MatDialogRef} from '@angular/material/dialog';
import {UserItemDialogComponent} from './user-item-dialog/user-item-dialog.component';

declare var electron: any;
declare var fs: any;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
    title = 'Password Generator';
    fileExtension = '.pg';
    cards: any[] = [];
    searchText: any;

    constructor(public dialog: MatDialog) {
    }

    ngOnInit() {
    }

    ngOnDestroy() {
    }

    get cardItems() {
        if (!this.searchText) {
            return this.cards;
        }
        console.debug(this.searchText);
        return this.cards.filter(f => f.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
                || f.comment.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1);
    }

    addItem() {
        const dialogRef = this.dialog.open(UserItemDialogComponent, {
            data: {
                title: 'New password info',
                item: {
                    name: '',
                    value: '',
                    comment: '',
                },
            },
        });
        dialogRef.afterClosed().subscribe(result => {
            this.cards.push(result);
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
        electron.remote.dialog.showOpenDialog(
            {
                properties: ['openFile'],
                filters: [
                    {name: 'User configuration', extensions: ['pg']},
                    {name: 'All Files', extensions: ['*']},
                ],
            },
        ).then(file => {
            if (!file.canceled) {
                this.cards = JSON.parse(fs.readFileSync(file.filePaths[0], 'utf8', function (err, data) {
                    if (err) return null;
                    return data;
                }));
            }
        }).catch(err => {
            console.debug(err);
        })
    }

    save() {
        electron.remote.dialog.showSaveDialog({
                properties: ['createDirectory', 'showOverwriteConfirmation'],
                filters: [
                    {name: 'User configuration', extensions: ['pg']},
                    {name: 'All Files', extensions: ['*']},
                ],
                defaultPath: `userData${this.fileExtension}`,
            },
        ).then(file => {
            if (!file.canceled) {
                fs.writeFileSync(file.filePath.toString(), JSON.stringify(this.cards), (err) => {
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
