const { contextBridge } = require('electron');
const platform = require('./platform');

contextBridge.exposeInMainWorld('electron', { platform });
