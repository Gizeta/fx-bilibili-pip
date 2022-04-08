"use strict";

browser.pictureInPictureParent.setOverridesForBilibili({
  "https://www.bilibili.com/video/*": {
    videoWrapperScriptPath: `moz-extension://${location.href.match(/moz-extension:\/\/([0-9a-f\-]+)\//)[1]}/video-wrappers/bilibili.js`,
  },
});
