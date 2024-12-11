//  Modulos
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
//Exports
exports.window = () => {
    let window = new BrowserWindow({
        width: 720,
        height: 640,
        show: false,
        maximizable: true,
        minimizable: true,
        resizable: true,
        movable: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    //CONFIGURACIONES
    window.maximize();
    window.hide();
    //window.setMenu(null);
    window.loadURL(url.format({
        pathname: path.join(__dirname, './../../frontend/html/panel.html'),
        protocol: 'file',
        slashes: true
    }));
    //  config menu
    window.setMenu(Menu.buildFromTemplate([
        {
            label: 'Herramientas de Desarollo',
            accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
            click(item, focusedWindow) {
                focusedWindow.toggleDevTools();
            }
        },
        {
            label: 'recargar',
            role: 'Reload'
        }
    ]));
    return window;
}