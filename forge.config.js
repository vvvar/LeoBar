require('dotenv').config();

let publishers = [];
let packagerConfig = {};
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
    config: {},
  },
];
if (process.env.NODE_ENV == 'production') {
  publishers = [
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
  ];
  packagerConfig = {
    name: 'LeoBar',
    executableName: 'LeoBar',
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
  };
}

module.exports = { publishers, packagerConfig, rebuildConfig, makers };
