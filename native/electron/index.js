const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain, ipcRenderer} = electron;

var mainWnd = null;

function createMainWnd() {
    mainWnd = new BrowserWindow({
        backgroundColor:'#dddddd',
        width:800,
        height:600,
        frame:false,
    });

    mainWnd.loadURL(`file://${__dirname}/index.html`);

    mainWnd.webContents.openDevTools();

    mainWnd.on('closed', () => {
       mainWnd = null;
       console.log('closed');
    });
}


app.on('ready', createMainWnd);

app.on('window-all-closed', () => {
    app.quit();
});