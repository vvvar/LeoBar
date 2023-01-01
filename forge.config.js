require('dotenv').config();

const EXECUTABLE_NAME = 'LeoBar';

let publishers = [];
let packagerConfig = {
  executableName: EXECUTABLE_NAME,
};
let rebuildConfig = {};
let makers = [
  {
    name: '@electron-forge/maker-squirrel',
    config: {},
  },
  {
    name: '@electron-forge/maker-dmg',
    config: {},
  },
  {
    name: '@electron-forge/maker-deb',
    config: {
      options: {
        name: 'LeoBar',
      },
    },
  },
];
if (process.env.NODE_ENV == 'production') {
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
  packagerConfig = Object.assign(packagerConfig, {
    name: EXECUTABLE_NAME,
    executableName: EXECUTABLE_NAME,
    icon: 'assets/appIcon',
    appBundleId: 'com.vvvoin.leobar',
    extendInfo: {
      LSUIElement: 'true',
    },
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
