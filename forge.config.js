require('dotenv').config();
const iconset = require('./src/iconset');

const EXECUTABLE_NAME = 'LeoBar';

let publishers = [];
let packagerConfig = {
  name: EXECUTABLE_NAME,
  executableName: EXECUTABLE_NAME,
  icon: iconset.getAppIconIcoPath(),
  appBundleId: 'com.vvvoin.leobar',
  extendInfo: {
    LSUIElement: 'true',
  },
};
let rebuildConfig = {};
let makers = [
  {
    name: '@electron-forge/maker-squirrel',
    config: {
      setupIcon: iconset.getAppIconIcoPath(),
    },
  },
  {
    name: '@electron-forge/maker-dmg',
    platforms: ['darwin'],
    config: {
      // Dirty hack - use unsupported format
      // so appdmg would set default DMG icon.
      // Without it electron icon would be used.
      icon: iconset.getAppIconPngPath(),
      // Faster, but OS X 10.11+ only.
      format: 'ULFO',
    },
  },
  {
    name: '@electron-forge/maker-deb',
    config: {
      options: {
        bin: 'LeoBar',
      },
    },
  },
];
if (process.env.NODE_ENV == 'production') {
  // Prevents accidental publishing of non-production builds.
  publishers = publishers.concat([
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'vvvar',
          name: 'leo-bar',
        },
        prerelease: true,
        draft: true,
      },
    },
  ]);
  // Since signings is slow, do it only for production builds.
  packagerConfig = Object.assign(packagerConfig, {
    osxSign: {
      hardenedRuntime: false,
      gatekeeperAssess: false,
      identity: process.env.MACOS_APPLE_IDENTITY,
    },
    osxNotarize: {
      appBundleId: 'com.vvvoin.leobar',
      tool: 'notarytool',
      appleId: process.env.MACOS_APPLE_ID,
      appleIdPassword: process.env.MACOS_APPLE_PASSWORD,
      teamId: process.env.MACOS_APPLE_TEAM_ID,
    },
  });
}

module.exports = { publishers, packagerConfig, rebuildConfig, makers };
