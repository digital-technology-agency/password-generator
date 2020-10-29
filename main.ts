import {app, BrowserWindow, screen, autoUpdater} from 'electron';
import * as path from 'path';
import * as url from 'url';

let win: BrowserWindow = null;
const args = process.argv.slice(1),
    serve = args.some(val => val === '--serve');

function createWindow(): BrowserWindow {
    const electronScreen = screen;
    const size = electronScreen.getPrimaryDisplay().workAreaSize;
    win = new BrowserWindow({
        x: 0,
        y: 0,
        width: size.width,
        height: size.height,
        autoHideMenuBar: (serve) ? false : true,
        webPreferences: {
            nodeIntegration: true,
            allowRunningInsecureContent: (serve) ? true : false,
            contextIsolation: false,
            enableRemoteModule: true,
        },
    });
    win.setMenu(null);
    if (serve) {
        win.webContents.openDevTools();
        require('electron-reload')(__dirname, {
            electron: require(`${__dirname}/node_modules/electron`),
        });
        win.loadURL('http://localhost:4200');

    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true,
        }));
        win.setMenu(null);
    }
    win.on('closed', () => {
        win = null;
    });
    return win;
}

function sendStatusToWindow(text) {
    win.webContents.send('message', text);
}

try {
    /*    autoUpdater.on('checking-for-update', () => {
            sendStatusToWindow('Checking for update...');
        });
        autoUpdater.on('update-available', (info) => {
            sendStatusToWindow('Update available.');
        });
        autoUpdater.on('update-not-available', (info) => {
            sendStatusToWindow('Update not available.');
        });
        autoUpdater.on('error', (err) => {
            sendStatusToWindow('Error in auto-updater. ' + err);
        });
        autoUpdater.on('update-downloaded', (ev, info) => {
            sendStatusToWindow('Update downloaded');
            setTimeout(function() {
                autoUpdater.quitAndInstall();
            }, 5000)
        });*/

    app.on('ready', function () {
        createWindow();
    });

    // Quit when all windows are closed.
    app.on('window-all-closed', () => {
        // On OS X it is common for applications and their menu bar
        // to stay active until the user quits explicitly with Cmd + Q
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });

    app.on('activate', () => {
        // On OS X it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (win === null) {
            createWindow();
        }
    });


} catch (e) {
    // Catch Error
    // throw e;
}
