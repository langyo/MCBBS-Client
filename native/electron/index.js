const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain, ipcRenderer} = electron;

let mainWnd = null;

function createMainWnd() {
    mainWnd = new BrowserWindow({
        width:800,
        height:600,
        backgroundColor:'#fbf2db'
    });

    mainWnd.loadURL(`file://${__dirname}/index.html`);

    // mainWnd.webContents.openDevTools();

    mainWnd.on('resize', ()=>{

    });

    mainWnd.on('closed', () => {
       mainWnd = null;
    });
}


app.on('ready', createMainWnd);

app.on('window-all-closed', () => {
    app.quit();
});