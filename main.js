const { app, BrowserWindow } = require('electron');
const serve = require('electron-serve');
const path = require('path');

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  if (app.isPackaged) {
    appServe(win).then(() => {
      win.loadURL('app://-');
    });
  } else {
    win.loadURL('http://localhost:3000');
    win.webContents.openDevTools();
    win.webContents.on('did-fail-load', (e, code, desc) => {
      win.webContents.reloadIgnoringCache();
    });
  }
};

// function createWindow() {
//   const win = new BrowserWindow({
//     width: 800,
//     height: 600,
//   });

//   win.loadURL('http://localhost:3000'); // will point to your running Next app
// }

app.whenReady().then(createWindow);
