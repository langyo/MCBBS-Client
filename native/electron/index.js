const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain, ipcRenderer} = electron;
const ipc = require('electron').ipcMain;
let mainWnd = null;
let taskWnd = [];

function createMainWnd() {
    mainWnd = new BrowserWindow({
        width:800,
        height:600,
        minWidth:800,
        maxWidth: 800,
        minHeight: 600,
        maxHeight: 600,
        backgroundColor:'#fbf2db',
        useContentSize: true,
        show: false,
        // frame: false,
        // titleBarStyle: 'hidden'
    });

    mainWnd.loadURL(`file://${__dirname}/public/index.html`);

    mainWnd.on('ready-to-show', ()=>{
        // TODO: 未来可能会让菜单重新回归以支持一些新奇功能，不过绝对不是以原生菜单的形式
        Menu.setApplicationMenu(null);
        mainWnd.show();
        // mainWnd.webContents.openDevTools({ detach:true });
    });

  mainWnd.on('closed', () => {
    mainWnd = null;
    process.exit();
  });
}

app.on('ready', ()=>{
  createMainWnd();
});

app.on('window-all-closed', () => {
    app.quit();
});
