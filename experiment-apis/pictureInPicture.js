"use strict";

const lazy = {};

ChromeUtils.defineESModuleGetters(lazy, {
  clearInterval: "resource://gre/modules/Timer.sys.mjs",
  setInterval: "resource://gre/modules/Timer.sys.mjs",
});

this.pictureInPictureParent = class extends ExtensionAPI {
  getAPI(context) {
    return {
      pictureInPictureParent: {
        setOverridesForBilibili(overrides) {
          if (AppConstants.platform == "android") {
            return;
          }

          let retryTimes = 0;
          const timer = lazy.setInterval(function() {
            if (retryTimes > 10) {
              lazy.clearInterval(timer);
              console.error('[fx-bilibili-pip] failed to set overrides');
              return;
            }

            const originOverrides = Services.ppmm.sharedData.get(
              "PictureInPicture:SiteOverrides"
            );
            if (!originOverrides) {
              retryTimes++;
              return;
            }

            Services.ppmm.sharedData.set(
              "PictureInPicture:SiteOverrides",
              Object.assign(originOverrides, overrides)
            );
            lazy.clearInterval(timer);
          }, 1000);
        },
      },
    };
  }
};
