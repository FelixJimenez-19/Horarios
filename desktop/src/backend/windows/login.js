//  Modulos
const { app, BrowserWindow, Menu, ipcMain } = require('electron');
const url = require('url');
const path = require('path');
//Exports
exports.window = () => {
    let window = new BrowserWindow({
        width: 400,
        height: 500,
        show: true,
        maximizable: false,
        minimizable: false,
        resizable: false,
        movable: true,
        webPreferences: {
            nodeIntegration: true
        }
    });
    //CONFIGURACIONES
    //window.setMenu(null);
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
    window.loadURL(url.format({
        pathname: path.join(__dirname, './../../frontend/html/login.html'),
        protocol: 'file',
        slashes: true
    }));
    return window;
}
















// window.setMenu(Menu.buildFromTemplate([
    //     {
    //         label: 'Herramientas de Desarollo',
    //         accelerator: process.platform == 'darwin' ? 'Comand+D' : 'Ctrl+D',
    //         click(item, focusedWindow) {
    //             focusedWindow.toggleDevTools();
    //         }
    //     },
    //     {
    //         label: 'recargar',
    //         role: 'Reload'
    //     }
    // ]));