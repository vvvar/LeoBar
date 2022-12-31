require('update-electron-app')();
const {
  app,
  nativeImage,
  session,
  Tray,
  Menu,
  webContents,
  clipboard,
  globalShortcut,
  shell,
} = require('electron');
const { menubar } = require('menubar');
const contextMenu = require('electron-context-menu');
const path = require('path');

const appIconPath = path.join(__dirname, '../assets', `appIconTemplate.png`);
const trayIconPath = path.join(__dirname, '../assets', 'trayIconTemplate.png');
const htmlPath = path.join(__dirname, `index.html`);

function handleElectronAppReady() {
  const trayImage = nativeImage.createFromPath(trayIconPath);
  const tray = new Tray(trayImage);
  const mb = menubar({
    browserWindow: {
      icon: trayImage,
      transparent: appIconPath,
      webPreferences: {
        webviewTag: true,
      },
      width: 500,
      height: 550,
      minWidth: 500,
      maxWidth: 600,
    },
    tray,
    icon: trayImage,
    index: `file://${htmlPath}`,
    showOnAllWorkspaces: true,
    showDockIcon: false,
    preloadWindow: true,
  });

  // Force Leo to switch to mobile
  const mobileCookie = { url: 'https://dict.leo.org/', name: 'rewrite', value: 'mobile' };
  session.defaultSession.cookies.set(mobileCookie);

  mb.on('ready', () => {
    const { window } = mb;
    if (process.platform !== 'darwin') {
      window.setSkipTaskbar(true);
    } else {
      app.dock.hide();
    }

    const getLeoWebView = () => {
      const webView = webContents
        .getAllWebContents()
        .find(webContent => webContent.getTitle().includes('leo.org'));
      if (webView) {
        return webView;
      } else {
        console.error('Cannot find webview with Leo.org');
        return null;
      }
    };

    const contextMenuTemplate = [
      {
        label: 'Open in browser',
        click: () => {
          const leoWebView = getLeoWebView();
          if (leoWebView) {
            shell.openExternal(leoWebView.getURL());
          }
        },
      },
      {
        label: 'Copy URL to clipboard',
        click: () => {
          const webView = getLeoWebView();
          if (webView) {
            clipboard.writeText(webView.getURL());
          }
        },
      },
      {
        type: 'separator',
      },
      {
        label: 'Reload',
        accelerator: 'Command+R',
        click: () => {
          window.reload();
        },
      },
      {
        label: 'Quit',
        accelerator: 'Command+Q',
        click: () => {
          app.quit();
        },
      },
    ];
    tray.on('right-click', () => {
      mb.tray.popUpContextMenu(Menu.buildFromTemplate(contextMenuTemplate));
    });
    tray.on('click', e => {
      //check if ctrl or meta key is pressed while clicking
      e.ctrlKey || e.metaKey
        ? mb.tray.popUpContextMenu(Menu.buildFromTemplate(contextMenuTemplate))
        : null;
    });
    const menu = new Menu();
    Menu.setApplicationMenu(menu);
  });

  if (process.platform == 'darwin') {
    // restore focus to previous app on hiding
    mb.on('after-hide', () => mb.app.hide());
  }
}

function handleAllWindowsClosed() {
  if (process.platform !== 'darwin') {
    app.quit();
  }
}

app.on('web-contents-created', (e, contents) => {
  if (contents.getType() == 'webview') {
    // open link with external browser in webview
    contents.on('new-window', (e, url) => {
      e.preventDefault();
      shell.openExternal(url);
    });
    // set context menu in webview
    contextMenu({
      window: contents,
    });
    // we can't set the native app menu with "menubar" so need to manually register these events
    // register cmd+c/cmd+v events
    contents.on('before-input-event', (event, input) => {
      const { control, meta, key } = input;
      if (!control && !meta) return;
      if (key === 'c') contents.copy();
      if (key === 'v') contents.paste();
      if (key === 'x') contents.cut();
      if (key === 'a') contents.selectAll();
      if (key === 'z') contents.undo();
      if (key === 'y') contents.redo();
      if (key === 'q') app.quit();
      if (key === 'r') contents.reload();
    });
  }
});

app.on('ready', handleElectronAppReady);
app.on('window-all-closed', handleAllWindowsClosed);
