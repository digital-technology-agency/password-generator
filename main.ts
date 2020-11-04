import {app, BrowserWindow, screen, Notification} from 'electron';
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
        /*appTray = new Tray(`${__dirname}/src/assets/logo.png`)*/
    } else {
        win.loadURL(url.format({
            pathname: path.join(__dirname, 'dist/index.html'),
            protocol: 'file:',
            slashes: true,
        }));
        win.setMenu(null);
        /*win.webContents.openDevTools();*/
        /*appTray = new Tray(path.join(__dirname, 'dist/assets/logo.png'));*/
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
    app.on('ready', () => setTimeout(createWindow, 400));
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
    throw e;
/*    new Notification({
        title: "Error",
        body: e,
    }).show()*/
}
