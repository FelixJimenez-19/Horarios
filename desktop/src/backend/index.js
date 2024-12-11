//  Modulos
const {
    app,
    BrowserWindow,
    Menu,
    ipcMain,
    ipcRenderer
} = require('electron');
const path = require('path');
//  Ventanas
const login = require("./windows/login");
const panel = require("./windows/panel");
//  config project
let electronReload = () => {
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
    });
}
if (process.env.NODE_ENV !== 'production') electronReload();
//MAIN: ready
let wLogin;
let wPanel;
app.on('ready', () => {
    wLogin = login.window();
    wPanel = panel.window();
    //eventos ventana
    wLogin.on('closed', () => {
        app.quit();
    });
    wPanel.on('close', (e) => {
        this.logout();
        e.preventDefault();
    });
});
//Exports
let session = null;
exports.login = (_session) => {
    session = _session;
    wLogin.hide();
    wPanel.reload();
    wPanel.webContents.on('did-finish-load', function() {
        wPanel.show();
    });
}
exports.getSession = () => {
    return session;
}
exports.logout = () => {
    session = null;
    wLogin.show();
    wPanel.hide();
}