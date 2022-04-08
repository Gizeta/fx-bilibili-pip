"use strict";

class PictureInPictureVideoWrapper {
  setCaptionContainerObserver(video, updateCaptionsFunction) {
    let container = document.querySelector(".bilibili-player-video-subtitle .subtitle-wrap");

    if (container) {
      updateCaptionsFunction("");
      const callback = function(mutationsList, observer) {
        for (const mutation of mutationsList) {
          let textNodeList = container
            .querySelectorAll(".subtitle-item-text");
          if (!textNodeList) {
            updateCaptionsFunction("");
            return;
          }

          updateCaptionsFunction(
            Array.from(textNodeList, x => x.textContent).join("\n")
          );
        }
      };

      // immediately invoke the callback function to add subtitles to the PiP window
      callback([1], null);

      let captionsObserver = new MutationObserver(callback);

      captionsObserver.observe(container, {
        attributes: false,
        childList: true,
        subtree: true,
      });
    }
  }
}

this.PictureInPictureVideoWrapper = PictureInPictureVideoWrapper;
