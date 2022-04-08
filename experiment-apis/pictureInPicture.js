"use strict";

ChromeUtils.defineModuleGetter(
  this,
  "setInterval",
  "resource://gre/modules/Timer.jsm"
);

ChromeUtils.defineModuleGetter(
  this,
  "clearInterval",
  "resource://gre/modules/Timer.jsm"
);

this.pictureInPictureParent = class extends ExtensionAPI {
  getAPI(context) {
    return {
      pictureInPictureParent: {
        setOverridesForBilibili(overrides) {
          if (AppConstants.platform == "android") {
            return;
          }

          let retryTimes = 0;
          const timer = setInterval(function() {
            if (retryTimes > 10) {
              clearInterval(timer);
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
            clearInterval(timer);
          }, 1000);
        },
      },
    };
  }
};
