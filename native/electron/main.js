const electron = require('electron');
const {app, BrowserWindow, Menu, ipcMain, ipcRenderer} = electron;

let mainWnd = null;

function createMainWnd() {
    mainWnd = new BrowserWindow({
        width:800,
        height:600,
        backgroundColor:'#fbf2db',
        useContentSize: true,
        show: false
    });

    mainWnd.loadURL(`file://${__dirname}/public/index.html`);
    
    mainWnd.on('ready-to-show', ()=>{
        // TODO: 未来可能会让菜单重新回归以支持一些新奇功能，不过绝对不是以原生菜单的形式
        Menu.setApplicationMenu(null);
        mainWnd.show();
        // mainWnd.webContents.openDevTools();
    })

    mainWnd.on('closed', () => {
       mainWnd = null;
    });
}


app.on('ready', createMainWnd);

app.on('window-all-closed', () => {
    app.quit();
});