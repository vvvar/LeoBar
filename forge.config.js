const { parsed } = require("dotenv").config();
module.exports = {
  // packagerConfig: {
  //   name: "ChatGPT",
  //   executableName: "ChatGPT",
  //   icon: "images/icon",
  //   appBundleId: "com.vincelwt.chatgptmac",
  //   extendInfo: {
  //     LSUIElement: "true",
  //   },
  //   osxSign: {
  //     hardenedRuntime: false,
  //     gatekeeperAssess: false,
  //     identity: "Developer ID Application: Lyser.io Ltd (R4PF6TTR6Z)",
  //   },
  //   osxNotarize: {
  //     appBundleId: "com.vincelwt.chatgptmac",

  //     tool: "notarytool",
  //     appleId: parsed.APPLE_ID,
  //     appleIdPassword: parsed.APPLE_PASSWORD,
  //     teamId: parsed.APPLE_TEAM_ID,
  //   },
  // },
  publishers: [
    {
      name: "@electron-forge/publisher-github",
      config: {
        repository: {
          owner: "vvvar",
          name: "leo-menu-bar",
        },
        prerelease: true,
      },
    },
  ],

  packagerConfig: {
    name: "LeoBar",
    executableName: "LeoBar",
    icon: "assets/appIcon",
    appBundleId: "com.vvvoin.leobar",
    extendInfo: {
      LSUIElement: "true",
    },
    osxSign: {
      hardenedRuntime: false,
      gatekeeperAssess: false,
      identity: "Apple Development: voinovvladv@gmail.com (53U36UH95C)",
    },
    // osxNotarize: {
    //   appBundleId: "com.vvvoin.leobar",
    //   tool: "notarytool",
    //   appleId: parsed.APPLE_ID,
    //   appleIdPassword: parsed.APPLE_PASSWORD,
    //   teamId: parsed.APPLE_TEAM_ID,
    // },
  },
  rebuildConfig: {},
  makers: [
    {
      name: "@electron-forge/maker-squirrel",
      config: {},
    },
    {
      name: "@electron-forge/maker-dmg",
      platforms: ["darwin"],
      config: {},
    },
    {
      name: "@electron-forge/maker-deb",
      config: {},
    },
    {
      name: "@electron-forge/maker-rpm",
      config: {},
    },
  ],
};