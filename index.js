const { app, BrowserWindow } = require("electron");

let win;

app.on("ready", () => {
    win = new BrowserWindow({
        width: 900,
        height: 500,
        webPreferences: {
            nodeIntegration: true,
        },
    });
    win.loadFile("./index.html");
    // win.setMenu(null);
    win.on("closed", () => win = null);
})

app.on("window-all-closed", () => app.quit());

require("electron-reload")(__dirname);