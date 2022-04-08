"use strict";

this.pictureInPictureParent = class extends ExtensionAPI {
  getAPI(context) {
    return {
      pictureInPictureParent: {
        setOverridesForBilibili(overrides) {
          if (AppConstants.platform == "android") {
            return;
          }

          const originOverrides = Services.ppmm.sharedData.get(
            "PictureInPicture:SiteOverrides"
          );
          Services.ppmm.sharedData.set(
            "PictureInPicture:SiteOverrides",
            Object.assign(originOverrides, overrides)
          );
        },
      },
    };
  }
};
