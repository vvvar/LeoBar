const path = require('path');
const platform = require('./platform');

function getPlatformDirName() {
  if (platform.isMac) {
    return 'macos';
  } else if (platform.isWindows) {
    return 'windows';
  } else if (platform.isLinux) {
    return 'linux';
  } else {
    throw new Error('Cannot get icon, unknown platform');
  }
}

function getAppIconPath() {
  return path.join(__dirname, '../assets', getPlatformDirName(), 'appIcon');
}

function getAppIconPngPath() {
  return `${getAppIconPath()}.png`;
}

function getAppIconIcoPath() {
  if (platform.isMac) {
    return `${getAppIconPath()}.icns`;
  } else if (platform.isWindows) {
    return `${getAppIconPath()}.ico`;
  } else if (platform.isLinux) {
    return `${getAppIconPath()}.icns`;
  } else {
    throw new Error('Cannot get icon, unknown platform');
  }
}

function getTrayIconPath() {
  return path.join(__dirname, '../assets', getPlatformDirName(), 'trayIconTemplate.png');
}

module.exports = { getAppIconPath, getAppIconPngPath, getAppIconIcoPath, getTrayIconPath };
